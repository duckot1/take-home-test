export type RawFlightData = {
  id: string
  ballId: string
  playerId: string
  type: 'Kick' | 'Pass'
  speed: number
  maxHeight: number
  spin: number
}

export type PlayerData = {
  id: string
  firstName: string
  lastName: string
  number: string
}

export type EventWithPlayer = RawFlightData & {
  player?: PlayerData
}
