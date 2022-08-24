import React from 'react'
import { Channel, getChannels } from './api'

export function Sidebar(props: { onChannelChange(channel): void }) {
  const [channels, setChannels] = React.useState<Channel[]>([])

  React.useEffect(() => {
    const fetchChannels = async () => {
      setChannels(await getChannels())
    }
    fetchChannels()
  }, [])

  const createOnChannelClick = (channel: Channel) => (e: React.SyntheticEvent) => {
    e.preventDefault()
    props.onChannelChange(channel)
  }

  return (
    <div className="sidebar">
      <h1>Channels</h1>
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <button onClick={createOnChannelClick(channel)}>{channel.channel}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}