# Tic Tac Toe (React + TypeScript)

A clean, interactive Tic Tac Toe game built with React, TypeScript, and Vite.

## Features

- 3x3 game board
- Player vs Computer mode
- Turn-based interaction
- Winner detection
- Draw detection
- Reset game option
- Visual status feedback for turn/result
- Responsive UI

## Tech Stack

- React
- TypeScript
- Vite
- CSS

## Game Rules

- You play as `X`.
- Computer plays as `O`.
- The computer attempts to prevent your win by:
  1. Taking a winning move if available
  2. Blocking your winning move
  3. Taking center
  4. Taking corners
  5. Taking next available cell

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Vercel Deployment

This project includes a `vercel.json` for SPA routing and static build output.

Deploy options:

- Import the Git repository in Vercel
- Or deploy using Vercel CLI

Typical Vercel settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

## Folder Structure

```text
src/
  App.tsx
  App.css
  index.css
```

## License

For learning and assignment use.
