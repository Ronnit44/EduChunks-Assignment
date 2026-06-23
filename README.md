# Bidirectional Rich Text Sync Across Iframes

## Overview

This project implements bidirectional synchronization of a rich text editor across two isolated iframes using the browser's `window.postMessage()` API.

The application demonstrates real-time communication between iframes through a host page acting as a message broker. Formatting actions, text updates, and editor state changes are synchronized between both editors while preventing infinite message loops.

---

## Architecture

```text
Frame A
   │
   │ postMessage
   ▼
Host Page
   ▲
   │ relay
   │
Frame B
```

Communication Flow:

1. User performs an action inside an iframe.
2. The iframe sends a message to the host page using `postMessage`.
3. The host identifies the source iframe.
4. The host relays the message to the opposite iframe.
5. The receiving iframe updates its editor state.
6. Infinite loop prevention ensures relayed updates are not re-broadcast.

---

## Core Features

### Rich Text Editor

* ContentEditable editor
* Bold formatting
* Italic formatting
* Strikethrough formatting

### Bidirectional Synchronization

* Frame A → Frame B synchronization
* Frame B → Frame A synchronization
* Real-time HTML synchronization

### Host-Based Message Routing

* Centralized message broker
* Source frame identification
* Cross-frame communication using `window.postMessage`

### Infinite Loop Prevention

* Remote updates are flagged
* Incoming synchronized updates are not re-broadcast to the host

---

## Additional Enhancements

### Origin Validation

* Incoming messages are validated before processing
* Prevents unauthorized cross-origin communication

### Active Toolbar State

* Toolbar buttons reflect the formatting state of the current cursor position

### Visual Sync Indicator

* Sync confirmation displayed when updates are received

---

## Bonus Features

### Real-Time Text Synchronization

* Typed text is synchronized instantly across both editors

### Undo / Redo Synchronization

* Ctrl + Z synchronization
* Ctrl + Y synchronization
* Changes remain consistent across both editors

### Live Action Log

* Host page records synchronization events
* Displays formatting actions and editor updates in real time

---

## Technologies Used

* React
* Vite
* JavaScript
* HTML
* CSS
* window.postMessage API

---

## Project Structure

```text
src/
│
├── App.jsx
├── App.css
│
public/
│
├── editor.html
├── editor.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Ronnit44/EduChunks-Assignment
```

Navigate to the project directory:

```bash
cd EduChunks-Assignment
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Design Decisions

### Why postMessage?

Iframes operate in isolated browsing contexts and cannot directly access each other's DOM. The `window.postMessage()` API provides a secure and standardized mechanism for cross-frame communication.

### Why Use a Host Broker?

Instead of allowing direct communication between iframes, the host page acts as a centralized broker:

* Simpler architecture
* Easier debugging
* Better scalability
* Clear separation of responsibilities

### Infinite Loop Prevention Strategy

Incoming synchronized updates are marked as remote updates. These updates are applied locally but are prevented from triggering another outgoing synchronization event.

---

## Future Improvements

* Cursor position preservation during synchronization
* Shared undo/redo history stack
* Collaborative multi-user editing
* Richer formatting options
* Operational Transformation (OT) or CRDT-based synchronization

---

## Assessment Requirements Coverage

### Core Requirements

* [x] Two iframes with contenteditable editor
* [x] Bold / Italic / Strikethrough toolbar
* [x] Format action synchronization
* [x] Host message routing
* [x] Bidirectional synchronization
* [x] Infinite loop prevention

### Nice to Have

* [x] Origin validation
* [x] Toolbar active state
* [x] Visual sync indicator

### Bonus Challenges

* [x] Text input synchronization
* [x] Undo / Redo synchronization
* [x] Action log

---

## Author

Ronnit Sagar
