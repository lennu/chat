import React from 'react'
import { Channel, Message } from './api'
import { MainView } from './MainView'
import { Sidebar } from './Sidebar'

interface MessageStorage {
  [channel: string]: Message[]
} 

export function App() {
  const [channel, setChannel] = React.useState<Channel>(undefined)
  const [messageStorage, setMessageStorage] = React.useState<MessageStorage>({})

  const getMessages = () => channel && messageStorage[channel.id] ? messageStorage[channel.id] : []

  const setMessages = (channel: string, messages: Message[]) => {
    setMessageStorage({...messageStorage, [channel]: messages})
  }

  return (
    <div className="app-grid">
      <Sidebar onChannelChange={setChannel} />
      <MainView channel={channel} messages={getMessages()} setMessages={setMessages} />
    </div>
  )
}