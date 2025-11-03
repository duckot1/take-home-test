# Frontend Take-Home Challenge: Real-Time Event Stream Viewer

## Overview

You are tasked with building a small frontend application that displays a real-time stream of football-related events.
The goal is to demonstrate your ability to design and implement a performant, maintainable, and user-friendly solution that consumes both REST and WebSocket data sources.

A Node.js backend server is provided in the `backend/` folder to simulate live data. See `backend/README.md` for setup instructions.

## Requirements

### Initial Data

- On page load, fetch all existing events and all players.
- Display the events in a tabular view, showing relevant player details.

### Real-time Updates

- Connect to the WebSocket and update the table as new events arrive.

### Performance

- The `/events` endpoint may return thousands of records.
- Ensure that the interface remains responsive and efficient when rendering large data sets.

### Error Handling

- Handle API or WebSocket failures gracefully in the UI.
- The app should recover automatically or offer a retry mechanism.

### Testing

- Include at least one meaningful test for a core UI component.

### Code Quality

- Use modern frontend development practices.
- Structure your code as if this were part of a production codebase.
- Include clear setup and run instructions.

## Deliverables

A runnable frontend project hosted in a Git repository.

A short README explaining:
- How to start the app and run tests
- Key design or architectural decisions
- Any assumptions you made
- Optional improvements you'd make with more time

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
