import { EventWithPlayer } from '../types'

interface EventTableProps {
  events: EventWithPlayer[]
}

const EventTable = ({ events }: EventTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Player</th>
            <th>Number</th>
            <th>Ball ID</th>
            <th>Speed (km/h)</th>
            <th>Max Height (m)</th>
            <th>Spin (RPM)</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.type}</td>
              <td>
                {event.player
                  ? `${event.player.firstName} ${event.player.lastName}`
                  : 'Unknown Player'}
              </td>
              <td>#{event.player?.number || 'N/A'}</td>
              <td>{event.ballId}</td>
              <td>{event.speed.toFixed(2)}</td>
              <td>{event.maxHeight.toFixed(2)}</td>
              <td>{event.spin.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventTable
