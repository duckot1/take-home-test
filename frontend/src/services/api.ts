import { RawFlightData, PlayerData } from '../types'

const API_BASE_URL = 'http://localhost:8888'
const WS_URL = 'ws://localhost:8888/events'

export const fetchEvents = async (): Promise<RawFlightData[]> => {
  const response = await fetch(`${API_BASE_URL}/events`)
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export const fetchPlayers = async (): Promise<PlayerData[]> => {
  const response = await fetch(`${API_BASE_URL}/players`)
  if (!response.ok) {
    throw new Error('Failed to fetch players')
  }
  return response.json()
}

export const connectWebSocket = (
  onMessage: (event: RawFlightData) => void,
  onError: (error: Event) => void,
  onClose: () => void
): WebSocket => {
  const ws = new WebSocket(WS_URL)
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }
  
  ws.onerror = onError
  ws.onclose = onClose
  
  return ws
}
