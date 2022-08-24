import React from 'react'
import { Channel, postMessage } from './api'

interface Props {
  channel?: Channel,
  onSubmit(submittedMessage: string): void,
}

export function Editor(props: Props) {
  const [message, setMessage] = React.useState<string>('')

  React.useEffect(() => setMessage(''), [props.channel])

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.onSubmit(message)
    const value = message
    setMessage('')
    await postMessage(props.channel.id, value)
  }

  const onEnterPress = (e: React.KeyboardEvent) => {
    if(e.key == 'Enter' && e.shiftKey == false) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea value={message} onChange={onTextareaChange} onKeyDown={onEnterPress}></textarea>
      <button type="submit" disabled={message.length === 0}>Submit</button>
    </form>
  )
}