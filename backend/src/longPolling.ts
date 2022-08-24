import { Response } from "express"
import { createResponse } from "./requestUtils"
import { getChannelMessages } from "./storage"

const longPollers = {}

export const addLongPoller = (channel: string, res: Response) => {
  longPollers[channel] = longPollers[channel] ? longPollers[channel] : longPollers[channel] = []
  longPollers[channel].push(res)
}

export const handleLongPollers = (channel: string) => {
  if (!longPollers[channel]) { return }
  while (longPollers[channel].length !== 0) {
    const res = longPollers[channel].pop()
    const channelMessages = getChannelMessages(channel)
    const response = createResponse(channelMessages)
    res.json(response)
  }
}