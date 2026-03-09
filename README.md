# Wizzy : Offline Web GPT

**A lightning-fast, entirely browser-based offline AI assistant.** Wizzy allows you to run Large Language Models (LLMs) entirely within your web browser. No backend servers, no API keys, no subscriptions, and absolute data privacy.

---

## 🌟 Why Wizzy?

Traditional AI web interfaces send your personal conversations to the cloud. Wizzy flips the script by downloading the AI's "brain" directly into your browser's cache using WebAssembly. Once loaded, you can literally turn off your Wi-Fi and continue chatting. Your data never leaves your device.

## 🚀 Core Features

* **100% Client-Side Execution:** Absolute privacy. Computations happen right on your local machine.
* **Bring Your Own Model (BYOM):** Seamlessly upload any `.gguf` model from your computer, or download community-recommended models directly via Hugging Face URLs.
* **Smart Chat Interface:** First-class support for beautiful Markdown, code blocks, and collapsible `<think>` processes (perfect for reasoning models like DeepSeek-R1).
* **Persistent Chat History:** Your conversations are automatically saved locally across sessions.
* **Enterprise-Grade Architecture:** Rebuilt from scratch using strict Separation of Concerns (SoC), Zustand for global state, and custom React Hooks (ViewModels) keeping the UI completely decoupled from the WebAssembly engine.

## 🛠️ Technology Stack

* **Core Framework:** React 19 + Vite + TypeScript
* **Styling:** Tailwind CSS v4 (Modern CSS-native configuration)
* **State Management:** Zustand (Modular domain stores)
* **AI Engine:** `@wllama/wllama` (Multi-threaded WebAssembly port of llama.cpp)
* **UI Components:** Lucide React (Icons), React Markdown (Formatting)
* **Backend:** Node.js, Docker.

## 💻 Quick Start Guide

### Prerequisites

Make sure you have [Node.js](https://www.google.com/search?q=https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/wizzy.git
cd wizzy
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

> **Note on Hosting:** If you decide to host Wizzy on platforms like GitHub Pages, the project includes a `coi-serviceworker.js` file. This intercepts requests to enable the `SharedArrayBuffer` security headers required for multi-threaded WebAssembly to function on static hosts.

## 🧠 Model Guidelines & Limitations

Because Wizzy runs inside a web browser, it is subject to standard browser hardware restrictions. Keep the following in mind for the best experience:

* **Supported Formats:** The engine strictly accepts `.gguf` files.
* **The 1GB Sweet Spot:** For optimal performance and fast load times, we highly recommend models under `1GB` in size (e.g., *Qwen 2.5 Coder 0.5B*, *SmolLM 360M*, or heavily quantized 1.5B models).
* **Browser Memory Limits:** Most modern browsers cap WebAssembly memory around 2GB to 4GB. Attempting to load models larger than 2GB will likely result in an Out-of-Memory (OOM) crash or a page refresh.
* **Troubleshooting Crashes:** If a model fails to load or throws a WebAssembly error, try lowering the **Context Length** in the settings, or choose a model with stronger quantization (such as `Q4_K_M` or `IQ3`).

## 🤝 Contributing

Contributions are always welcome! Since the codebase follows a strict modular architecture (Data Layer -> Services -> ViewModels -> UI), it is highly extensible. Feel free to open an issue or submit a Pull Request if you want to add new features like custom system prompts or dynamic context resizing.

## 📜 License

This project is licensed under the MIT License.
