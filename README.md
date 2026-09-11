# CodeExplain AI

> Understand code. Learn faster.

CodeExplain AI is an AI-powered code explanation tool built for the FlyRank FE-11 production assignment.

Users can paste source code, select the programming language and explanation level, and receive a clear AI-generated explanation covering what the code does, important programming concepts, and complexity where applicable.

## 🚀 Live Production

**Production URL:**  
https://code-explain-ai-eight.vercel.app

**GitHub Repository:**  
https://github.com/rabbani9826/code-explain-ai

---

## ✨ Features

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

---

## 🛠️ Tech Stack

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Groq API**
- **groq-sdk**
- **react-markdown**
- **remark-gfm**
- **Vercel**

---

## 🧠 How It Works

```text
User
  │
  ▼
CodeExplain AI UI
  │
  │ code + language + explanation level
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
```

The API key is kept on the server and is never exposed to the browser.

---

## 📁 Project Structure

```text
code-explain-ai/
│
├── app/
│   ├── api/
│   │   └── explain/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rabbani9826/code-explain-ai.git
cd code-explain-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Do not commit `.env.local` or expose the API key publicly.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | API key used for generating AI code explanations |

A template is provided in `.env.example`.

---

## 🔌 API

### POST `/api/explain`

The frontend sends the following information to the server:

```json
{
  "code": "def add(a, b):\n    return a + b",
  "language": "Python",
  "level": "Beginner"
}
```

The API validates the request before calling Groq.

### Supported Languages

- JavaScript
- TypeScript
- Python
- Java
- C
- C++
- C#
- Go
- Rust
- PHP

### Explanation Levels

- Beginner
- Intermediate
- Advanced

---

## 🛡️ Production Safety and Hygiene

The application includes basic protections against trivial abuse and oversized requests.

### Input Validation

The API performs server-side validation for:

- Empty code submissions
- Unsupported programming languages
- Invalid explanation levels
- Oversized code input

The maximum code input is:

```text
10,000 characters
```

The client also displays an input counter so users can see the remaining capacity.

### Rate Limiting

The `/api/explain` endpoint includes application-level IP-based rate limiting.

Current limit:

```text
5 requests per IP per minute
```

Additional requests receive an HTTP `429 Too Many Requests` response.

The current implementation uses an in-memory request store. This is suitable for the assignment and basic abuse protection, but it is not globally shared across multiple serverless instances.

For a larger production deployment, this could be replaced with a distributed solution such as Redis/Upstash or an edge/WAF-based rate limiter.

### Streaming/API Duration

The API route uses:

```ts
export const maxDuration = 30;
```

This prevents an AI request from running indefinitely.

### Secret Protection

The Groq API key is stored in an environment variable:

```text
GROQ_API_KEY
```

`.env.local` is ignored by Git and is never committed to the repository.

---

## 🧪 Testing

The application was tested during development and production deployment.

| Test | Result |
|---|---|
| Production page loads | ✅ Passed |
| Python code explanation | ✅ Passed |
| Beginner explanation level | ✅ Passed |
| AI response generated | ✅ Passed |
| Markdown rendering | ✅ Passed |
| Copy explanation UI | ✅ Passed |
| Empty input validation | ✅ Passed |
| Invalid language validation | ✅ Passed |
| 10,000-character input cap | ✅ Passed |
| Rate limiting | ✅ Passed |
| Production build | ✅ Passed |
| Vercel deployment | ✅ Passed |

### Production AI Test

A Python example was tested on the deployed application:

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
```

The production application successfully generated an explanation and correctly identified that the result is `8`.

Screenshots of the production test are included separately as submission proof.

---

## 🎨 Design Decisions

### Dark Developer-Focused Interface

A dark interface was selected because it matches common developer tools and makes code blocks easier to read.

### Two-Panel Layout

The main interface separates:

- **Your Code**
- **AI Explanation**

This makes it easy to compare the submitted code with the generated explanation.

### Explanation Levels

Different users have different levels of programming knowledge, so the application provides:

- Beginner explanations with simpler terminology
- Intermediate explanations with more technical detail
- Advanced explanations for experienced developers

### Markdown Rendering

AI responses are rendered as Markdown rather than displaying raw Markdown syntax.

This improves readability for:

- Headings
- Lists
- Code blocks
- Inline code
- Tables
- Blockquotes

---

## 📸 Screenshots

Production screenshots are provided separately in the assignment submission proof PDF.

The production proof demonstrates:

1. The deployed CodeExplain AI interface
2. Code submission
3. Language selection
4. Explanation level selection
5. Successful AI-generated explanation

---

## 🤖 AI Tools Used

AI-assisted development was used during the project.

### ChatGPT

Used for:

- Planning the application architecture
- Debugging and improving the Next.js implementation
- Designing the API validation flow
- Implementing input limits and rate limiting
- Reviewing production-readiness requirements
- Improving README documentation
- Troubleshooting deployment issues

### Claude

Used for:

- Code review and implementation assistance
- Reviewing frontend structure and UI details
- Helping identify potential improvements during development

AI tools were used as development assistants rather than as a replacement for testing or verification.

All important functionality was manually tested in the application before deployment.

---

## 👨‍💻 Human Verification

The application was manually verified by:

- Running the project locally
- Running the production build
- Testing the API validation behavior
- Testing rate limiting
- Testing the 10,000-character input limit
- Testing AI code explanation
- Verifying Markdown rendering
- Deploying to Vercel
- Testing the deployed production URL

The production AI flow was successfully verified using Python code.

---

## 🚀 Production Deployment

The application is deployed using Vercel.

### Production URL

https://code-explain-ai-eight.vercel.app

The `GROQ_API_KEY` environment variable is configured in the Vercel project settings rather than being committed to GitHub.

The deployment uses the Next.js production build.

---

## ⚙️ Production Build

To verify the project locally before deployment:

```bash
npm run build
```

The production build completed successfully during development.

To start the production server locally:

```bash
npm run start
```

---

## 📌 Limitations

The current version intentionally keeps the implementation simple for the assignment.

Known limitations:

- Rate limiting uses in-memory storage and is not globally distributed across serverless instances.
- AI explanations depend on the availability and response of the Groq API.
- AI-generated explanations may occasionally contain inaccuracies.
- No user authentication or saved explanation history is currently implemented.
- No persistent database is required for the current version.

---

## 🔮 Future Improvements

Possible future improvements include:

- Distributed Redis-based rate limiting
- User authentication
- Saved explanation history
- Syntax highlighting
- More programming languages
- File upload support
- Shareable explanation links
- Improved error reporting
- Usage analytics
- More advanced code analysis
- Custom domains
- Automated end-to-end testing

---

## 📜 Assignment Context

This project was created for the:

**FlyRank AI Engineering Internship — FE-11**

**Assignment:** Production Deployment and README

The focus of this assignment was to demonstrate:

- Production deployment
- Environment variable management
- API protection
- Input validation
- Rate limiting
- Production build verification
- Responsive frontend implementation
- Cross-browser considerations
- Clear technical documentation
- Honest documentation of AI-assisted development

---

## 📄 License

This project was created as part of the FlyRank internship assignment.