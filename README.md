# CodeExplain AI

> Understand code. Learn faster.

CodeExplain AI is an AI-powered code explanation tool built for the FlyRank FE-11 production assignment.

Users can paste code, select the programming language and explanation level, and receive a clear AI-generated explanation covering what the code does, important programming concepts, and complexity where applicable.

## Features

- 🤖 AI-powered code explanations using Groq
- 💡 Beginner, Intermediate, and Advanced explanation levels
- 🌐 Support for multiple programming languages
- 📖 Simple explanations with reduced technical jargon
- 🔍 Programming concept detection
- ⚡ Time and space complexity insights where applicable
- 📝 Markdown-formatted AI responses
- 📋 Copy explanation to clipboard
- 🔢 10,000-character input limit
- 🛡️ Server-side input validation
- 🚦 Application-level rate limiting
- ⏱️ API execution timeout with `maxDuration`
- 📱 Responsive interface for desktop and mobile screens

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Groq API
- `groq-sdk`
- `react-markdown`
- `remark-gfm`

## How It Works

```text
User
  │
  ▼
CodeExplain AI UI
  │
  │ code + language + level
  ▼
Next.js API Route
/api/explain
  │
  ├── Input validation
  ├── Language validation
  ├── 10,000 character limit
  ├── IP-based rate limiting
  └── 30-second execution limit
  │
  ▼
Groq API
  │
  ▼
AI-generated explanation
  │
  ▼
Markdown rendering
  │
  ▼
User