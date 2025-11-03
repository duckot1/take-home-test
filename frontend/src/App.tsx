
import EventTable from './components/EventTable'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ⚽ Football Events Viewer
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time event stream
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <EventTable events={[]} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
