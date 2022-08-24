export interface Channel { id: string, channel: string }
export interface Message { id: string, message: string, channel: string }
export interface ChannelsResponse { items: Channel[], total: number }
export interface MessagesResponse { items: Message[], total: number }

async function get<T>(url: string, abortSignal?: AbortSignal, cursor?: string): Promise<T> {
  const headers = cursor ? { 'Long-Poll-Cursor': cursor } : {}
  try {
    const response = await fetch(
      url,
      {
        headers,
        signal: abortSignal
      }
    )
    return response.json()
  } catch (e: unknown) {
    if (e instanceof DOMException) {
      // Cancelled request
      throw e
    }
  }
}

async function post<T>(url: string, body: string): Promise<T> {
  const response = await fetch(url, { body, method: 'POST'})
  return response.json()
}

export const getChannels = async () => {
  const response = await get<ChannelsResponse>(`http://localhost:12345/channels`)
  return response.items
}

export const getMessages = async (channel, abortSignal: AbortSignal, cursor: string) => {
  const response = await get<MessagesResponse>(
    `http://localhost:12345/channels/${channel}/messages`,
    abortSignal,
    cursor,
  )
  return response.items
}

export const postMessage = async (channel: string, body: string) => {
  const response = await post(`http://localhost:12345/channels/${channel}`, body)
  return response
}
