let idCount = 0
const getNewId = () => String(++idCount)

const storage = {
  channels: [
    { id: getNewId(), channel: 'Programming'},
    { id: getNewId(), channel: 'Design'},
    { id: getNewId(), channel: 'QA'},
  ],
  messages: []
}

export const getChannels = () => storage.channels

export const getChannelMessages = (channel: string) =>
  storage.messages.filter(item => item.channel === channel)

export const postChannelMessage = (channel: string, message: string) =>
  storage.messages.push({ id: getNewId(), message, channel })