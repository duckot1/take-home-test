import { useState, useEffect, useCallback, useRef } from 'react'
import { RawFlightData, PlayerData, EventWithPlayer } from '../types'
import { fetchEvents, fetchPlayers, connectWebSocket } from '../services/api'

export const useEventStream = () => {
  const [events, setEvents] = useState<EventWithPlayer[]>([])
  const [players, setPlayers] = useState<Map<string, PlayerData>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wsConnected, setWsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<number | null>(null)

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [eventsData, playersData] = await Promise.all([
        fetchEvents(),
        fetchPlayers(),
      ])

      const playersMap = new Map(playersData.map((p) => [p.id, p]))
      setPlayers(playersMap)

      const eventsWithPlayers = eventsData.map((event) => ({
        ...event,
        player: playersMap.get(event.playerId),
      }))

      setEvents(eventsWithPlayers)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
      setLoading(false)
    }
  }, [])

  const connectToWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      const ws = connectWebSocket(
        (newEvent) => {
          const eventWithPlayer = {
            ...newEvent,
            player: players.get(newEvent.playerId),
          }
          setEvents((prev) => [...prev, eventWithPlayer])
          setWsConnected(true)
        },
        (error) => {
          console.error('WebSocket error:', error)
          setWsConnected(false)
          scheduleReconnect()
        },
        () => {
          setWsConnected(false)
          scheduleReconnect()
        }
      )

      ws.onopen = () => {
        setWsConnected(true)
        setError(null)
      }

      wsRef.current = ws
    } catch (err) {
      console.error('Failed to connect to WebSocket:', err)
      scheduleReconnect()
    }
  }, [players])

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log('Attempting to reconnect WebSocket...')
      connectToWebSocket()
    }, 5000)
  }, [connectToWebSocket])

  const retry = useCallback(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    if (players.size > 0) {
      connectToWebSocket()
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [players, connectToWebSocket])

  return {
    events,
    loading,
    error,
    wsConnected,
    retry,
  }
}
