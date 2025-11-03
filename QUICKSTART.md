# Quick Start Guide

## Start the Application

### 1. Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

The backend will run at http://localhost:8888

### 2. Start the Frontend Application

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at http://localhost:3000

### 3. Open in Browser

Navigate to http://localhost:3000 in your browser.

## Run Tests

```bash
cd frontend
npm test
```

## Build for Production

```bash
cd frontend
npm run build
```

## What You'll See

- A table showing all football events (kicks and passes)
- Real-time updates as new events arrive via WebSocket
- Player information for each event
- Search and filter functionality
- Connection status indicator

## Features to Try

1. **Search**: Type a player name in the search box
2. **Filter**: Select "Kicks" or "Passes" to filter by event type
3. **Real-time**: Watch as new events appear every ~10 seconds
4. **Connection Status**: See the WebSocket connection indicator in the status bar
