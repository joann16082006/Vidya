# Pathfinder — Code Documentation & Architectural Overview

Pathfinder is a modern, AI-powered career counseling chatbot designed for 12th-grade students. This document provides a deep dive into the codebase, explaining how components interact, how streaming works, and how the AI integration is handled.

---

## 🚀 Tech Stack

- **Frontend**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (using CSS variables for dynamic themes)
- **AI Integration**: `@openrouter/sdk`
- **Model**: `arcee-ai/trinity-large-preview:free` (Configurable in `apiService.js`)

---

## 🏗️ Core Architecture & Data Flow

Pathfinder follows a **one-way data flow** architecture centered around the `ChatContainer`.

1. **User Input**: The user types a message in `ChatInput.jsx`.
2. **State Update**: `ChatContainer` adds the user message to the `messages` state and triggers the API call.
3. **API Request**: `apiService.js` sends the chat history (including a system prompt) to OpenRouter.
4. **Streaming**: As tokens arrive from the OpenRouter SDK, `ChatContainer` progressively updates the last AI message in the state.
5. **Rendering**: `ChatMessage` renders the text in real-time, parsing it for markdown and structured recommendation cards.

---

## 📂 File Structure Explained

### 1. `src/services/apiService.js` (The Engine)
This is where the OpenRouter SDK is initialized. 
- **System Prompt**: Defines the AI's personality as a supportive counselor.
- **`sendMessageStream`**: An async function that utilizes the SDK's `openrouter.chat.send` method. It takes an `onChunk` callback to feed tokens back to the UI as they arrive.
- **Nesting**: Note that the SDK requires parameters like `model` and `messages` to be nested inside a `chatGenerationParams` object.

### 2. `src/components/ChatContainer.jsx` (The Orchestrator)
The central hub of the application.
- **State Management**: Manages `messages[]` and `streamState` (idle, waiting, or streaming).
- **Auto-scroll**: Uses a `useEffect` and `useRef` to ensure the chat always stays scrolled to the bottom during streaming.
- **Optimistic Updates**: Adds the user message to the UI immediately before the network call starts.

### 3. `src/components/ChatMessage.jsx` (The Formatter)
Handles the visual presentation of messages.
- **Markdown Support**: A custom formatter handles bolding (`**`), bullet points, and headers.
- **Parsing logic**: It looks for specific patterns in the AI response. If it detects a structured pattern (like "1. **Course Name**"), it automatically extracts the details and renders **RecommendationCards** instead of just plain text.

### 4. `src/components/ChatInput.jsx` (The Entry Point)
A highly interactive input component.
- **Auto-resize**: The textarea grows vertically as the user types, up to a maximum height.
- **UX Hooks**: Prevents empty submissions and disables input while the AI is responding.

---

## ⚡ How Streaming Works

Traditional API calls wait for the entire response to finish (3-10 seconds) before showing anything. Pathfinder uses **SSE (Server-Sent Events)** via the SDK:

1. `ChatContainer` sets a placeholder assistant message: `{ role: 'assistant', content: '' }`.
2. As `sendMessageStream` receives individual words (tokens), it calls the callback.
3. `ChatContainer` appends that token to `streamingTextRef.current`.
4. It then updates the React state: `messages[last].content = newTotalText`.
5. This creates the "typewriter effect" seen in modern AI apps like ChatGPT.

---

## 🎨 Design System (`index.css`)

The design uses a **Glassmorphism** aesthetic with a deep indigo/violet theme.
- **CSS Variables**: All colors (e.g., `--accent`, `--bg-deep`) are defined in `:root`, making it easy to change the theme.
- **Animations**: Custom keyframes like `fadeInUp` and `bounceDot` (for the typing loader) are used to make the app feel alive.
- **Glow Orbs**: Background decorations in `App.jsx` use radial gradients to create depth without using heavy images.

---

## 🔐 Security & Configuration

- **API Key**: Managed via `.env` and accessed through `import.meta.env.VITE_OPENROUTER_API_KEY`. It is never hardcoded.
- **Safety**: The AI acts under a strict system prompt to avoid giving harmful or absolute financial/legal advice, emphasizing that decisions should be verified with human counselors.

---

## 🛠️ Modifying the Chatbot

- **Change Model**: Edit `MODEL` in `apiService.js`.
- **Change AI Personality**: Edit the `SYSTEM_PROMPT` in `apiService.js`.
- **Change UI Colors**: Modify the HEX codes in the `:root` section of `index.css`.
