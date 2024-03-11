import React from 'react'
import './App.css'
import {KycEmbedComponent} from './KycEmbedComponent'
import {Theme} from '@twilio-paste/theme'

function App() {
  return (
    <Theme.Provider theme='default'>
      <div className='App'>
        <KycEmbedComponent/>
      </div>
    </Theme.Provider>
)
}

export default App
