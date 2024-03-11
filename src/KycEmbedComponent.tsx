import React, {useEffect, useState} from 'react'
import './App.css'
import {TwilioComplianceEmbed} from 'twilio-compliance-embed'
import {Spinner} from '@twilio-paste/core/spinner'
import {Box} from '@twilio-paste/core'

type InboundEvent = {
  data: {
    inquiryId: string,
    inquirySessionToken: string
  },
  origin: string
}

type OutboundEvent = 'cancel' | 'complete' | 'ready' | 'error'

export const KycEmbedComponent = () => {

  const [inquiryId, setInquiryId] = useState<string | null>(null)
  const [inquirySessionToken, setInquirySessionToken] = useState<string | null>(null)
  const isLoading = !inquiryId && !inquirySessionToken

  useEffect(() => {
    const receiveMessage = (event: InboundEvent) => {

      console.log('>>> message received', event)

      if (event.origin !== 'http://localhost:63342')
        return

      setInquiryId(event.data.inquiryId)
      setInquirySessionToken(event.data.inquirySessionToken)
    }

    window.addEventListener('message', receiveMessage, false)

    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  const postEvent = (event: OutboundEvent) => {
    window.parent.postMessage({
      event: event,
    }, '*') // TODO: replace this with your exact origin for security
  }

  return isLoading ? (
      <Box top='50%' left='50%' position='fixed'>
        <Spinner size='sizeIcon110' decorative={false} title='Loading'/>
      </Box>
    ) :
    (<div className='App'>
      <TwilioComplianceEmbed
        inquiryId={inquiryId!}
        inquirySessionToken={inquirySessionToken!}
        onCancel={() => {
          postEvent('cancel')
          console.log('>>> cancel')
        }}
        onComplete={() => {
          console.log('>>> complete')
          postEvent('complete')
        }}
        onReady={() => {
          console.log('>>> ready')
          postEvent('ready')
        }}
        onError={() => {
          console.log('>>> error')
          postEvent('error')
        }}
      />
    </div>)
}