# Frontend Take-Home Challenge: Real-Time Event Stream Viewer

## Overview

You are tasked with building a small frontend application that displays a real-time stream of football-related events.
The goal is to demonstrate your ability to design and implement a performant, maintainable, and user-friendly solution that consumes both REST and WebSocket data sources.

A Node.js backend server is provided in the `backend/` folder to simulate live data. See `backend/README.md` for setup instructions.

## Tasks

Complete the following tasks in order. The basic project setup (React, TypeScript, Vite, Tailwind) has been provided for you.

### Task 1: Fetch Events and Handle States

- Fetch all existing events from the REST API on page load
- Display events in a table component
- Implement proper loading and error states
- Show appropriate user feedback for each state

### Task 2: WebSocket Connection and Real-time Updates

- Connect to the WebSocket event stream
- Update the table as new events arrive in real-time
- Handle WebSocket connection errors gracefully
- Implement automatic reconnection logic when the connection drops

### Task 3: Style the Table

- Add appropriate styling to the event table
- The table should be visually clear and easy to read
- Consider styling for headers, rows, and different event types
- Make the table responsive and professional-looking

### Task 4: Table Filtering

- **Filter by spin** - Create an appropriate UI component to filter events by the spin value

### Task 5: Virtual Scrolling

- Implement virtual scrolling for the event table
- The table should handle thousands of events efficiently
- Only visible rows should be rendered to the DOM

### Task 6: Component Testing

- Write comprehensive tests for the table component
- Tests should cover rendering, filtering, and event updates
- Use best practices for component testing

## Additional Requirements

### Code Quality

- Use modern frontend development practices
- Structure your code as if this were part of a production codebase
- Include clear setup and run instructions

### Performance

- The `/events` endpoint may return thousands of records
- Ensure that the interface remains responsive and efficient when rendering large data sets

### User Experience

- The interface should be clear, usable, and thoughtfully designed
- Provide appropriate feedback for all user interactions

## Deliverables

A runnable frontend project hosted in a Git repository.

## Evaluation Criteria

We'll evaluate your submission based on:

- **Correctness** — Does the app meet the functional requirements?
- **Performance** — Can it handle large event sets efficiently?
- **Code quality** — Is it readable, modular, and maintainable?
- **Error handling & resilience** — Does it deal gracefully with API/WS errors?
- **Testing** — Are core components or interactions tested?
- **User experience** — Is the interface clear, usable, and thoughtfully designed?

## Notes

- You may choose any frameworks, libraries, or patterns you find appropriate.
- The visual design is up to you, but clarity and usability are expected.
- If any part of the backend or data format is unclear, make reasonable assumptions and document them.
- Focus on a working, cleanly structured solution rather than a fully polished product.
