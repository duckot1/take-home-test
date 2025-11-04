# Football Events Viewer - Frontend

A real-time football events viewer built with React, TypeScript, and Tailwind CSS. This application displays live football event data (kicks and passes) from a WebSocket stream, combined with player information from a REST API.

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **Vitest**
- **React Testing Library**

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8888`

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend First

Make sure the backend server is running before starting the frontend:

```bash
# In a separate terminal, from the project root
cd backend
npm install
npm start
```

The backend should be running on `http://localhost:8888`.

### Start the Frontend

```bash
npm run dev
```

The application will open at `http://localhost:3000`.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```