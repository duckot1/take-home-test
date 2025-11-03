import { useState, useMemo } from 'react'
import { useEventStream } from './hooks/useEventStream'
import EventTable from './components/EventTable'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import StatusBar from './components/StatusBar'

function App() {
  const { events, loading, error, wsConnected, retry } = useEventStream()
  const [filterType, setFilterType] = useState<'All' | 'Kick' | 'Pass'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = useMemo(() => {
    let filtered = events

    // Filter by event type
    if (filterType !== 'All') {
      filtered = filtered.filter((event) => event.type === filterType)
    }

    // Filter by search query (player name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((event) =>
        event.player
          ? `${event.player.firstName} ${event.player.lastName}`
              .toLowerCase()
              .includes(query)
          : false
      )
    }

    return filtered
  }, [events, filterType, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ⚽ Football Events Viewer
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time event stream from the backend
          </p>
        </div>
      </header>

      <StatusBar wsConnected={wsConnected} eventCount={events.length} />

      <main className="max-w-7xl mx-auto px-6 py-6">
        {error && <ErrorMessage message={error} onRetry={retry} />}

        {loading && !error && <LoadingSpinner />}

        {!loading && !error && (
          <>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search Player
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by player name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Filter by Type
                  </label>
                  <select
                    id="filter"
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(e.target.value as 'All' | 'Kick' | 'Pass')
                    }
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Events</option>
                    <option value="Kick">Kicks</option>
                    <option value="Pass">Passes</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Showing {filteredEvents.length} of {events.length} events
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto">
                <EventTable events={filteredEvents} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
