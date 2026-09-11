"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [level, setLevel] = useState("Beginner");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) {
      setError("Please paste some code first.");
      setExplanation("");
      return;
    }

    setLoading(true);
    setError("");
    setExplanation("");
    setCopied(false);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          level,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to explain the code.");
      }

      setExplanation(data.explanation);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setExplanation("");
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!explanation) return;

    try {
      await navigator.clipboard.writeText(explanation);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the explanation.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
              {"</>"}
            </div>

            <div>
              <h1 className="text-lg font-bold">CodeExplain AI</h1>

              <p className="text-xs text-slate-400">
                Understand code. Learn faster.
              </p>
            </div>
          </div>

          <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            AI Code Assistant
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            ✨ Powered by Groq AI
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Understand any code
            <span className="block text-blue-500">
              in simple language.
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Paste your code, choose your experience level, and get a clear
            explanation with concepts and complexity.
          </p>
        </div>

        {/* Main Panels */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Code Input Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Your Code</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Paste the code you want to understand.
                </p>
              </div>

              <span
                className={`text-xs ${
                  code.length >= 9500
                    ? "text-red-400"
                    : "text-slate-500"
                }`}
              >
                {code.length}/10000
              </span>
            </div>

            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value.slice(0, 10000));
                setError("");
              }}
              placeholder={`// Paste your code here...

function greet(name) {
  return "Hello " + name;
}`}
              className="h-80 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />

            {/* Selectors */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm text-slate-400"
                >
                  Language
                </label>

                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C</option>
                  <option>C++</option>
                  <option>C#</option>
                  <option>Go</option>
                  <option>Rust</option>
                  <option>PHP</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="mb-2 block text-sm text-slate-400"
                >
                  Explanation Level
                </label>

                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleExplain}
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Analyzing code..." : "Explain Code →"}
              </button>

              <button
                onClick={handleClear}
                disabled={loading}
                className="rounded-xl border border-slate-700 px-5 py-3.5 font-semibold text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* AI Explanation Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">AI Explanation</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Your explanation will appear here.
                </p>
              </div>

              {explanation && !loading && (
                <button
                  onClick={handleCopy}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
            </div>

            <div className="min-h-[450px] rounded-xl border border-slate-800 bg-slate-950 p-6">
              {/* Loading */}
              {loading ? (
                <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                  <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

                  <h4 className="text-lg font-semibold">
                    Analyzing your code...
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    Groq AI is preparing your explanation.
                  </p>
                </div>
              ) : explanation ? (
                /* Markdown Explanation */
                <div className="max-w-none text-sm leading-7 text-slate-300">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-6 border-b border-slate-800 pb-2 text-xl font-bold text-white first:mt-0">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-5 text-lg font-semibold text-white">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-4 text-slate-300">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-4 ml-5 list-disc space-y-2 text-slate-300">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-4 ml-5 list-decimal space-y-2 text-slate-300">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="pl-1">{children}</li>
                      ),

                      code: ({ className, children, ...props }) => {
                        const isBlock =
                          className?.includes("language-");

                        if (isBlock) {
                          return (
                            <code
                              className={`${className ?? ""} block overflow-x-auto text-sm`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }

                        return (
                          <code
                            className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-blue-300"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },

                      pre: ({ children }) => (
                        <pre className="mb-5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4">
                          {children}
                        </pre>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="mb-4 border-l-4 border-blue-500 pl-4 italic text-slate-400">
                          {children}
                        </blockquote>
                      ),

                      hr: () => (
                        <hr className="my-6 border-slate-800" />
                      ),

                      table: ({ children }) => (
                        <div className="mb-5 overflow-x-auto">
                          <table className="w-full border-collapse text-left text-sm">
                            {children}
                          </table>
                        </div>
                      ),

                      th: ({ children }) => (
                        <th className="border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white">
                          {children}
                        </th>
                      ),

                      td: ({ children }) => (
                        <td className="border border-slate-800 px-4 py-2">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {explanation}
                  </ReactMarkdown>
                </div>
              ) : (
                /* Empty State */
                <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                    ✨
                  </div>

                  <h4 className="text-lg font-semibold">
                    Ready to explain your code
                  </h4>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Paste some code on the left and click “Explain Code” to
                    generate an AI-powered explanation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-3 text-xl">📖</div>

            <h3 className="font-semibold">
              Simple explanations
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Understand complex code without unnecessary jargon.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-3 text-xl">🔍</div>

            <h3 className="font-semibold">
              Concept detection
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Discover the programming concepts used in your code.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-3 text-xl">⚡</div>

            <h3 className="font-semibold">
              Complexity insights
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Learn about time and space complexity where applicable.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        CodeExplain AI · Built for the FlyRank FE-11 production assignment
      </footer>
    </main>
  );
}