const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 8888;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server, path: '/events' });

// Sample player data
const players = [
  { id: 'player-1', firstName: 'Cristiano', lastName: 'Ronaldo', number: '7' },
  { id: 'player-2', firstName: 'Lionel', lastName: 'Messi', number: '10' },
  { id: 'player-3', firstName: 'Neymar', lastName: 'Jr', number: '11' },
  { id: 'player-4', firstName: 'Kevin', lastName: 'De Bruyne', number: '17' },
  { id: 'player-5', firstName: 'Kylian', lastName: 'Mbappé', number: '9' },
  { id: 'player-6', firstName: 'Mohamed', lastName: 'Salah', number: '11' },
  { id: 'player-7', firstName: 'Robert', lastName: 'Lewandowski', number: '9' },
  { id: 'player-8', firstName: 'Virgil', lastName: 'van Dijk', number: '4' },
  { id: 'player-9', firstName: 'Luka', lastName: 'Modrić', number: '10' },
  { id: 'player-10', firstName: 'Harry', lastName: 'Kane', number: '9' },
  { id: 'player-11', firstName: 'Erling', lastName: 'Haaland', number: '9' },
  { id: 'player-12', firstName: 'Bruno', lastName: 'Fernandes', number: '8' },
  { id: 'player-13', firstName: 'Raheem', lastName: 'Sterling', number: '7' },
  { id: 'player-14', firstName: 'Sadio', lastName: 'Mané', number: '10' },
  { id: 'player-15', firstName: 'Joshua', lastName: 'Kimmich', number: '6' },
];

// Ball IDs for variety
const ballIds = ['ball-a', 'ball-b', 'ball-c'];

// Store events in memory
let events = [];

// Generate random event
function generateRandomEvent() {
  const eventTypes = ['Kick', 'Pass'];
  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  const randomBall = ballIds[Math.floor(Math.random() * ballIds.length)];
  
  return {
    id: uuidv4(),
    ballId: randomBall,
    playerId: randomPlayer.id,
    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    speed: parseFloat((Math.random() * 100 + 20).toFixed(2)), // 20-120 km/h
    maxHeight: parseFloat((Math.random() * 30 + 1).toFixed(2)), // 1-31 meters
    spin: parseFloat((Math.random() * 3000 + 500).toFixed(2)), // 500-3500 RPM
  };
}

// Initialize with a large dataset (configurable)
function initializeEvents(count = 1000) {
  console.log(`Initializing ${count} events...`);
  events = [];
  for (let i = 0; i < count; i++) {
    events.push(generateRandomEvent());
  }
  console.log(`${events.length} events initialized.`);
}

// Initialize events on startup
initializeEvents();

// REST Endpoints

// GET /events - Returns all existing events
app.get('/events', (req, res) => {
  console.log(`GET /events - Returning ${events.length} events`);
  res.json(events);
});

// GET /players - Returns all players
app.get('/players', (req, res) => {
  console.log(`GET /players - Returning ${players.length} players`);
  res.json(players);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    eventsCount: events.length,
    playersCount: players.length,
    connectedClients: wss.clients.size
  });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  
  ws.on('message', (message) => {
    console.log('Received message from client:', message.toString());
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Broadcast new event to all connected WebSocket clients
function broadcastEvent(event) {
  const message = JSON.stringify(event);
  let clientCount = 0;
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      clientCount++;
    }
  });
  
  if (clientCount > 0) {
    console.log(`Broadcasted event ${event.id} to ${clientCount} client(s)`);
  }
}

// Generate and broadcast new events every ~10 seconds
setInterval(() => {
  const newEvent = generateRandomEvent();
  events.push(newEvent);
  console.log(`Generated new event: ${newEvent.type} by player ${newEvent.playerId}`);
  broadcastEvent(newEvent);
}, 10000); // 10 seconds

// Start server
server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('Football Events Backend Server');
  console.log('='.repeat(50));
  console.log(`HTTP Server running on http://localhost:${PORT}`);
  console.log(`WebSocket Server running on ws://localhost:${PORT}/events`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/events`);
  console.log(`  GET  http://localhost:${PORT}/players`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log(`  WS   ws://localhost:${PORT}/events`);
  console.log('='.repeat(50));
});
