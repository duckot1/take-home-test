# Football Events Backend Server

This is the backend server for the Frontend Take-Home Challenge. It provides REST and WebSocket endpoints to simulate live football event data.

## Quick Start

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on **http://localhost:8888**

You should see output like:
```
==================================================
Football Events Backend Server
==================================================
HTTP Server running on http://localhost:8888
WebSocket Server running on ws://localhost:8888/events

Available endpoints:
  GET  http://localhost:8888/events
  GET  http://localhost:8888/players
  GET  http://localhost:8888/health
  WS   ws://localhost:8888/events
==================================================
```

## Backend Endpoints

### REST Endpoints

- **GET http://localhost:8888/events**  
  Returns all existing flight events.

- **GET http://localhost:8888/players**  
  Returns a list of player details.

- **GET http://localhost:8888/health**  
  Returns server health status and statistics.

### WebSocket Endpoint

- **ws://localhost:8888/events**  
  WebSocket endpoint that emits a new random event roughly every 10 seconds.

## Data Shapes

### Event Shape

```typescript
export type RawFlightData = {
  id: string
  ballId: string
  playerId: string
  type: 'Kick' | 'Pass'
  speed: number
  maxHeight: number
  spin: number
}
```

### Player Shape

```typescript
export type PlayerData = {
  id: string
  firstName: string
  lastName: string
  number: string
}
```

Each event references a player by `playerId`.

## Backend Implementation Details

### Features

- Initializes with **1000 events** on startup (configurable in `server.js`)
- 15 sample players with realistic names
- Generates new random events every 10 seconds
- Broadcasts new events to all connected WebSocket clients
- CORS enabled for easy local development
- Health check endpoint for monitoring

### Event Generation

Events are randomly generated with:
- Random player assignment
- Random ball ID (3 different balls)
- Random event type (Kick or Pass)
- Realistic speed values (20-120 km/h)
- Realistic height values (1-31 meters)
- Realistic spin values (500-3500 RPM)

### Customization

To change the initial number of events, modify the `initializeEvents()` call in `server.js`:

```javascript
// Initialize with 5000 events instead of 1000
initializeEvents(5000);
```

## Testing the Backend

### Test REST Endpoints

```bash
# Get all events
curl http://localhost:8888/events

# Get all players
curl http://localhost:8888/players

# Get health status
curl http://localhost:8888/health
```

### Test WebSocket

You can use a WebSocket client like `wscat`:

```bash
npm install -g wscat
wscat -c ws://localhost:8888/events
```

Or use JavaScript in the browser console:
```javascript
const ws = new WebSocket('ws://localhost:8888/events');
ws.onmessage = (event) => console.log('New event:', JSON.parse(event.data));
```
