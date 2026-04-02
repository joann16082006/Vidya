# Vidya — AI College Information Assistant
### Sri Ramakrishna College of Arts and Science for Women

> **Vidya** is an AI-powered chatbot that acts as the official virtual representative for Sri Ramakrishna College of Arts and Science for Women (SRCW), Coimbatore. It answers prospective student queries about courses, placements, infrastructure, bus routes, clubs, events, and more — 24/7.

---

## ✨ Features

- 🤖 **Conversational AI** — Powered by `arcee-ai/trinity-large-preview` via OpenRouter, with real-time token streaming
- 📄 **RAG Pipeline** — Retrieves relevant context from a pre-built PDF knowledge base (departmental brochures and trust overview)
- 📬 **Lead Capture** — Collects visitor name and contact details before serving information
- 📋 **Application Submission** — AI-guided enquiry flow that saves applications locally and sends email notifications
- 💌 **Email Notifications** — Automatic admission enquiry emails via EmailJS
- 🃏 **Recommendation Cards** — Structured course/program cards rendered from AI list responses
- ⚡ **Streaming Responses** — Typewriter-style live response rendering (no waiting for the full reply)
- 📱 **Responsive Design** — Full-screen on mobile, 820px floating window on desktop

---

## 🏛️ About the College

**Sri Ramakrishna College of Arts and Science for Women**
- 📍 395, Sarojini Naidu Road, New Siddhapudur, Coimbatore – 641044
- 🎓 35+ years of academic excellence
- ✅ NAAC 'A+' Accredited | Affiliated to Bharathiar University | Autonomous
- 📞 +91 7373144766
- 📧 enquiry@srcw.ac.in
- 🌐 [www.srcw.ac.in](https://www.srcw.ac.in)
- 📸 [@srcwcbeofficial](https://www.instagram.com/srcwcbeofficial)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| AI | OpenRouter SDK (`@openrouter/sdk`) |
| LLM | `arcee-ai/trinity-large-preview:free` |
| Email | EmailJS (`@emailjs/browser`) |
| Storage | Browser `localStorage` |
| PDF Parsing | `pdf-parse` (offline extraction) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/joann16082006/Vidya.git
cd Vidya
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> - Get a free OpenRouter API key at [openrouter.ai](https://openrouter.ai)
> - Set up EmailJS at [emailjs.com](https://www.emailjs.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── ChatContainer.jsx    # Main orchestrator — state, streaming, workflow
│   ├── ChatMessage.jsx      # Chat bubble + markdown renderer + card parser
│   ├── ChatInput.jsx        # Auto-resize textarea + send button
│   ├── Loader.jsx           # Animated typing indicator (3 bouncing dots)
│   ├── RecommendationCard.jsx  # Course/career recommendation card
│   └── NCCBoatChart.jsx     # Visual NCC infographic component
├── services/
│   ├── apiService.js        # OpenRouter SDK, system prompt, streaming logic
│   ├── ragService.js        # Keyword-based PDF knowledge base retrieval
│   ├── dbService.js         # localStorage mock database for applications
│   └── emailService.js      # EmailJS integration for admission emails
└── data/
    └── knowledge_base.json  # Pre-extracted college PDF content (13 pages)
```

---

## 🔐 Security Notes

- API keys are stored in `.env` and accessed via `import.meta.env` — **never hardcoded**
- `.env` is listed in `.gitignore` and is **not committed** to the repository
- The AI operates under a strict system prompt to prevent off-topic or harmful responses
- All user application data is stored in the **browser's localStorage only** — no external database

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project was built for **Sri Ramakrishna College of Arts and Science for Women**. All college information, branding, and data belong to SRCW and the SNR Sons Charitable Trust.
