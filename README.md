# FuncBox Web

A modern documentation portal for the [funcBox](https://github.com/funcBox-i3/funcBox) utility library, featuring interactive API references for Python and Java with live code examples.

## Features

- **Complete API Docs** — Full Python reference sourced from the official funcBox README, including all Beta & Published functions.
- **Modern UI** — Royal Amethyst dark theme with animated blobs, glassmorphism nav, and terminal-style code blocks.
- **Smooth Animations** — Page transitions and scroll-triggered reveals via `framer-motion`.
- **Sidebar Search** — Filter functions in real-time with grouped category navigation.
- **Java Package Explorer** — Browse Java packages by module with clickable package cards.
- **Client-Side Routing** — `react-router-dom` with scroll-to-top and active link state.
- **Copy-to-Clipboard** — All code blocks have a one-click copy button.
- **Responsive** — Mobile-first layout with collapsible navigation.

## Tech Stack

| Layer     | Library / Tool              |
|-----------|-----------------------------|
| Framework | React 19 + Vite 8           |
| Routing   | react-router-dom v7         |
| Animation | framer-motion               |
| Icons     | lucide-react                |
| Syntax    | react-syntax-highlighter    |
| Fonts     | Outfit + JetBrains Mono     |

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```powershell
# Windows (if script execution is restricted)
powershell -ExecutionPolicy Bypass -Command "npm install"

# macOS / Linux
npm install
```

### Development

```powershell
npm run dev
```

App runs at `http://localhost:5173/` (or the next available port).

### Build

```powershell
npm run build
```

## Pages

| Route      | Description                          |
|------------|--------------------------------------|
| `/`        | Landing page with hero and features  |
| `/python`  | Full Python API reference            |
| `/java`    | Java package explorer + API reference |
