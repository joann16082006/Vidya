Student Career Guidance Chatbot
📌 Project Overview

We are building an AI-powered career guidance chatbot for students who have recently completed their 12th board examinations.

The chatbot will:

Analyze the student's academic marks

Understand their interests and preferences

Suggest suitable courses, career paths, and degree programs

Provide interactive guidance through conversation

The goal is to help students make informed decisions about their higher education and future careers.

🤖 AI & Backend Integration

We will use Generative AI via the OpenRouter API to power the chatbot.

The OpenRouter API key will be provided.

The chatbot should send structured prompts to the API.

The AI should respond with:

Recommended courses

Reasoning behind recommendations

Possible career paths

Optional follow-up questions

The conversation must feel:

Interactive

Friendly

Student-focused

Clear and structured

🖥️ Frontend Tech Stack

The frontend is already initialized with:

ReactJS (Vite)

TailwindCSS

The chatbot UI will:

Be fully responsive (mobile + desktop)

Follow a clean and modern design

Use reusable and modular components

🧩 Architecture & Code Guidelines
✅ Component-Based Structure

Code must be modular and separated into components such as:

ChatContainer

ChatMessage

ChatInput

ApiService

RecommendationCard

Loader

Each file must:

Not exceed 300 lines of code

Follow clean code practices

Use functional components with hooks

Avoid unnecessary complexity

🎯 Core Functional Requirements

The chatbot should:

Ask the student:

Name (optional)

12th stream (Science / Commerce / Arts / Other)

Marks percentage

Subjects studied

Areas of interest

Career goals (if any)

Based on responses:

Generate course suggestions

Explain why each course fits

Suggest career opportunities

Provide alternative options

Allow:

Follow-up questions

Refinement of suggestions

Continued conversation flow

🎨 UI/UX Requirements

Chat-style interface (like modern AI chat apps)

Scrollable message container

Typing indicator / loader animation

Clear distinction between:

User messages

AI responses

Card-style layout for course recommendations

Smooth transitions

Mobile-first design

🔐 Security & Best Practices

API key must not be exposed directly in frontend code.

Use environment variables (e.g., import.meta.env)

Handle API errors gracefully

Add loading states

Prevent empty submissions

📈 Future Scope (Optional Enhancements)

Save chat history

Add user profile system

Multi-language support

Course filtering by country

Export recommendations as PDF

Integrate real college databases

🧠 AI Behavior Guidelines

The AI should:

Be supportive and encouraging

Avoid overly technical language

Give structured answers using bullet points

Ask clarifying questions when needed

Never give absolute guarantees

Avoid harmful or misleading advice

📦 Deliverables

Modular React components

Clean UI with TailwindCSS

OpenRouter API integration

Fully responsive chatbot interface

Maintainable and scalable structure