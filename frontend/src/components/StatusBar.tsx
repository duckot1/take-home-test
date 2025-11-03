interface StatusBarProps {
  wsConnected: boolean
  eventCount: number
}

const StatusBar = ({ wsConnected, eventCount }: StatusBarProps) => {
  return (
    <div className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              wsConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}
          ></div>
          <span className="text-sm text-gray-700">
            WebSocket: {wsConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        Total Events: <span className="font-semibold">{eventCount}</span>
      </div>
    </div>
  )
}

export default StatusBar
