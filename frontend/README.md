# Football Events Viewer - Frontend

A real-time football events viewer built with React, TypeScript, and Tailwind CSS. This application displays live football event data (kicks and passes) from a WebSocket stream, combined with player information from a REST API.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

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

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Features

### Core Functionality

✅ **Initial Data Loading**
- Fetches all existing events and players on page load
- Displays events in a responsive table with player details

✅ **Real-time Updates**
- WebSocket connection for live event streaming
- Automatically adds new events to the table as they arrive
- Visual indicator showing WebSocket connection status

✅ **Performance Optimization**
- Efficient rendering for large datasets (1000+ events)
- Virtual scrolling with fixed header and scrollable body
- Memoized filtering to prevent unnecessary re-renders
- Optimized event merging with player data

✅ **Error Handling**
- Graceful API failure handling with retry mechanism
- Automatic WebSocket reconnection (5-second intervals)
- User-friendly error messages

✅ **User Experience**
- Search functionality to filter by player name
- Filter by event type (All, Kick, Pass)
- Event count display
- Color-coded event types (blue for Kick, green for Pass)
- Responsive design that works on different screen sizes
- Loading spinner during initial data fetch

### Additional Features

- **Status Bar**: Shows WebSocket connection status and total event count
- **Responsive Table**: Fixed header with scrollable body (max height: 600px)
- **Striped Rows**: Alternating row colors for better readability
- **Type Badges**: Visual distinction between Kicks and Passes

## Architecture & Design Decisions

### Project Structure

```
src/
├── components/          # React components
│   ├── EventTable.tsx   # Main table component
│   ├── ErrorMessage.tsx # Error display with retry
│   ├── LoadingSpinner.tsx
│   └── StatusBar.tsx    # Connection status indicator
├── hooks/
│   └── useEventStream.ts # Custom hook for data fetching & WebSocket
├── services/
│   └── api.ts           # API and WebSocket connection logic
├── test/
│   ├── setup.ts         # Test configuration
│   └── EventTable.test.tsx # Component tests
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Tailwind CSS imports
```

### Key Design Decisions

1. **Custom Hook Pattern (`useEventStream`)**
   - Encapsulates all data fetching and WebSocket logic
   - Makes components cleaner and more focused on presentation
   - Easier to test and reuse

2. **Data Merging Strategy**
   - Players are stored in a `Map` for O(1) lookup performance
   - Events are merged with player data on load and as they arrive
   - Ensures consistent data structure throughout the app

3. **WebSocket Resilience**
   - Automatic reconnection on connection loss
   - Reconnection attempts every 5 seconds
   - Visual feedback to user about connection status
   - Cleanup on component unmount to prevent memory leaks

4. **Performance Optimizations**
   - `useMemo` for filtered events to prevent recalculation on every render
   - `useCallback` for event handlers to maintain referential equality
   - Fixed height container with overflow scrolling for large datasets
   - Efficient list rendering without virtualization (adequate for 1000s of items)

5. **Component Architecture**
   - Small, focused components with single responsibilities
   - Props are explicitly typed with TypeScript interfaces
   - Separation of concerns (UI, logic, API)

6. **Styling Approach**
   - Tailwind CSS for utility-first styling
   - No custom CSS needed beyond Tailwind directives
   - Responsive design with mobile-first approach
   - Consistent color scheme and spacing

### TypeScript Types

```typescript
type RawFlightData = {
  id: string
  ballId: string
  playerId: string
  type: 'Kick' | 'Pass'
  speed: number
  maxHeight: number
  spin: number
}

type PlayerData = {
  id: string
  firstName: string
  lastName: string
  number: string
}

type EventWithPlayer = RawFlightData & {
  player?: PlayerData
}
```

## Assumptions Made

1. **Backend Availability**: The backend server is assumed to be running and accessible at `http://localhost:8888`

2. **Data Integrity**: All events reference valid player IDs, though the app handles missing players gracefully

3. **Event Immutability**: Events are never updated or deleted, only added

4. **Browser Support**: Modern browsers with WebSocket support (Chrome, Firefox, Safari, Edge)

5. **Performance Requirements**: The table remains responsive with up to 10,000 events without virtualization

6. **Network Reliability**: Transient network issues are handled with reconnection logic

## Future Improvements

Given more time, I would implement:

### Performance Enhancements
- **Virtual Scrolling**: Use `react-virtual` or `react-window` for rendering only visible rows with datasets > 10,000 events
- **Pagination**: Add pagination for better control over large datasets
- **Lazy Loading**: Load events in chunks as user scrolls

### Features
- **Advanced Filtering**: Filter by player, ball ID, speed range, height range
- **Sorting**: Click column headers to sort by any field
- **Data Visualization**: Charts showing event distribution, player statistics
- **Export Functionality**: Download events as CSV/JSON
- **Time Range Filter**: View events from specific time periods
- **Real-time Statistics**: Show live stats (average speed, most active player, etc.)
- **Event Details Modal**: Click event to see full details

### Testing
- **Integration Tests**: Test the full data flow from API to UI
- **WebSocket Mocking**: Better WebSocket testing with mock server
- **E2E Tests**: Use Playwright or Cypress for end-to-end testing
- **Performance Tests**: Measure render performance with large datasets
- **Accessibility Tests**: Ensure keyboard navigation and screen reader support

### Code Quality
- **Error Boundaries**: React error boundaries for graceful error handling
- **Logger Service**: Structured logging for better debugging
- **Analytics**: Track user interactions and performance metrics
- **ESLint/Prettier**: Code formatting and linting rules
- **Storybook**: Component documentation and isolated development

### DevOps
- **CI/CD Pipeline**: Automated testing and deployment
- **Docker Support**: Containerize the application
- **Environment Variables**: Better configuration management
- **Performance Monitoring**: Real-time performance tracking

### Accessibility
- **ARIA Labels**: Improve screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators and tab order
- **Color Contrast**: Ensure WCAG compliance

### UX Improvements
- **Skeleton Loading**: Show skeleton UI during initial load
- **Optimistic Updates**: Show new events immediately with loading state
- **Undo/Redo**: For filters and sorting
- **Persistent State**: Save user preferences in localStorage
- **Dark Mode**: Theme toggle for dark/light mode
- **Responsive Tables**: Better mobile table experience

## Troubleshooting

### Backend Connection Issues

If you see "Failed to fetch events" or WebSocket disconnection:

1. Ensure the backend is running:
   ```bash
   cd ../backend && npm start
   ```

2. Check that the backend is accessible at `http://localhost:8888`

3. Check browser console for detailed error messages

### Build Issues

If you encounter build errors:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Ensure you're using Node.js v14 or higher:
   ```bash
   node --version
   ```

## License

ISC
