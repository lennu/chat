import React from 'react'
import { Channel, getMessages, Message } from './api'
import { Editor } from './Editor'

interface Props {
  channel?: Channel,
  messages: Message[],
  setMessages(channel: string, messages: Message[]): void
}

export function MainView(props: Props) {
  if (!props.channel) { return null }

  const listRef = React.useRef<HTMLUListElement>()
  const [submittedMessage, setSubmittedMessage] = React.useState<string>()
  
  const scrollList = () => listRef.current.scrollTo({top: listRef.current.scrollHeight})

  React.useEffect(() => {
    setSubmittedMessage(undefined)
    const controller = new AbortController()
    const fetchMessages = async () => {
      const messages = await getMessages(props.channel.id, controller.signal, String(props.messages.length))
      props.setMessages(props.channel.id, messages)
      scrollList()
    }
    fetchMessages()
    return () => controller.abort()
  }, [props.messages, props.channel])

  const onSubmit = (message: string) => {
    setSubmittedMessage(message)
    scrollList()
  }

  return (
    <div className="main-view">
      <h1>{props.channel.channel}</h1>
      <ul ref={listRef}>
        {props.messages.map(message => <li key={message.id}>{message.message}</li>)}
        {submittedMessage && <li>{submittedMessage}</li>}
      </ul>
      <Editor channel={props.channel} onSubmit={onSubmit} />
    </div>
  )
}