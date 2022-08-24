import express from 'express'
import { addLongPoller, handleLongPollers } from './longPolling'
import { bodyParser, cors, CREATED, createResponse, longPollCursorHeader } from './requestUtils'
import { getChannelMessages, getChannels, postChannelMessage } from './storage'

const port = 12345

const app = express()
app.use(bodyParser).use(cors)

app.get('/channels', (_req, res) => {
  const channels = getChannels()
  const response = createResponse(channels)
  res.json(response)
})

app.get('/channels/:channel/messages', async (req, res) => {
  const cursor = req.header(longPollCursorHeader)
  const channelMessages = getChannelMessages(req.params.channel)
  const response = createResponse(channelMessages)
  
  cursor === String(response.total) ? addLongPoller(req.params.channel, res) : res.json(response)
})

app.post('/channels/:channel', (req, res) => {
  postChannelMessage(req.params.channel, req.body)
  res.status(CREATED)
  res.json(null)

  handleLongPollers(req.params.channel)
})

app.listen(port, () => console.log(`backend is running at https://localhost:${port}`))
