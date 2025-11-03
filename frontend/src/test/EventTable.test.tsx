import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventTable from '../components/EventTable'
import { EventWithPlayer } from '../types'

describe('EventTable', () => {
  it('renders event data correctly', () => {
    const mockEvents: EventWithPlayer[] = [
      {
        id: '1',
        ballId: 'ball-a',
        playerId: 'player-1',
        type: 'Kick',
        speed: 85.5,
        maxHeight: 15.2,
        spin: 2500.0,
        player: {
          id: 'player-1',
          firstName: 'Cristiano',
          lastName: 'Ronaldo',
          number: '7',
        },
      },
      {
        id: '2',
        ballId: 'ball-b',
        playerId: 'player-2',
        type: 'Pass',
        speed: 65.3,
        maxHeight: 8.5,
        spin: 1800.0,
        player: {
          id: 'player-2',
          firstName: 'Lionel',
          lastName: 'Messi',
          number: '10',
        },
      },
    ]

    render(<EventTable events={mockEvents} />)

    // Check if player names are rendered
    expect(screen.getByText('Cristiano Ronaldo')).toBeInTheDocument()
    expect(screen.getByText('Lionel Messi')).toBeInTheDocument()

    // Check if event types are rendered
    expect(screen.getByText('Kick')).toBeInTheDocument()
    expect(screen.getByText('Pass')).toBeInTheDocument()

    // Check if player numbers are rendered
    expect(screen.getByText('#7')).toBeInTheDocument()
    expect(screen.getByText('#10')).toBeInTheDocument()
  })

  it('renders empty table when no events', () => {
    render(<EventTable events={[]} />)

    // Table should still have headers
    expect(screen.getByText('Event Type')).toBeInTheDocument()
    expect(screen.getByText('Player')).toBeInTheDocument()
    expect(screen.getByText('Speed (km/h)')).toBeInTheDocument()
  })

  it('handles events with missing player data', () => {
    const mockEvents: EventWithPlayer[] = [
      {
        id: '1',
        ballId: 'ball-a',
        playerId: 'player-unknown',
        type: 'Kick',
        speed: 85.5,
        maxHeight: 15.2,
        spin: 2500.0,
        player: undefined,
      },
    ]

    render(<EventTable events={mockEvents} />)

    expect(screen.getByText('Unknown Player')).toBeInTheDocument()
    expect(screen.getByText('#N/A')).toBeInTheDocument()
  })
})
