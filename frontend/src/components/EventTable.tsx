import { EventWithPlayer } from '../types'

interface EventTableProps {
  events: EventWithPlayer[]
}

const EventTable = ({ events }: EventTableProps) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Event Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Player
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Number
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Ball ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Speed (km/h)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Max Height (m)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Spin (RPM)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <tr
              key={event.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    event.type === 'Kick'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {event.type}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {event.player
                  ? `${event.player.firstName} ${event.player.lastName}`
                  : 'Unknown Player'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                #{event.player?.number || 'N/A'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {event.ballId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {event.speed.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {event.maxHeight.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {event.spin.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventTable
