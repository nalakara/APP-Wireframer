# ⚡ Vibe-Coding Master Prompt

Use the prompt below to recreate this complete application using AI Coding Assistants (e.g., Cursor, Claude Code, Windsurf, or Google AI Studio).

---

```markdown
Build a full-stack, single-page web application called "App Wireframer" that transforms raw software ideas into production-ready specifications, visual low-fidelity wireframes, and multi-agent AI development prompts through a 4-step progressive wizard.

### Tech Stack & Architecture Constraints
- **Frontend**: React 18+ (Vite), TypeScript, Tailwind CSS, Lucide Icons.
- **Backend Proxy**: Express.js server proxying requests to the Gemini API (`@google/genai` using model `gemini-2.5-flash`). Keep API keys strictly server-side (`process.env.GEMINI_API_KEY`).
- **Local Persistence**: Client-side IndexedDB with debounced auto-save (1s delay) and a multi-project modal manager (create blank, load sample, delete, switch).
- **Localization**: Built-in bilingual support (English and Bahasa Indonesia) with instant UI switching and full project AI translation.
- **UX Requirement**: Smooth auto-scroll to the top (`window.scrollTo`) when transitioning between wizard stages.

---

### Progressive Wizard Stages:

#### 1. Stage 1: Specify (Idea & Requirements Definition)
- **Input Fields**: App Name, Concept Description, Target Audience, Problem Statement, and Localization metadata (languages, currencies, measurement units).
- **AI Spec Engine (`/api/gemini/specify`)**: Outputs structured JSON containing:
  * Project Overview.
  * User Stories (strict format: "As a [role], I want [action] so that [benefit]").
  * Functional Requirements.
- **Inline Editing**: Allow editing overview, adding/deleting user stories and requirements dynamically.
- **Quick Action Bar**: Buttons to load localized sample templates (Indonesian Book Club / English Fitness App), translate entire project via AI, and clear the form.

#### 2. Stage 2: Plan (Architecture, Data Models & Interactive Wireframes)
- **Feature Selector**: Checkbox matrix of common features (Auth, Social Login, Push Notifications, Dark Mode, Payment Gateway, Chat, Offline Support, etc.).
- **NFR Controls**: Sliders or selectors for Security, Performance, and Scalability.
- **AI Architecture Engine (`/api/gemini/plan`)**: Outputs:
  * Markdown Data Schema tables.
  * 3rd-party API suggestions.
  * UI/UX Design guidelines and step-by-step User Flow journey.
  * Low-Fidelity Interactive Wireframes rendered in an interactive smartphone frame. Each component (header, card, hero, list, chart, tabs, chat, form, button) is interactive—clicking a component opens a side Inspector displaying its label and design notes.

#### 3. Stage 3: Task (Smart Decomposition & Agent Squad Allocation)
- **Modular Task Breakdown (`/api/gemini/tasks`)**: Deconstructs requirements into atomic tasks with:
  * Title & Category.
  * Acceptance Criteria list.
  * Required Tools & Tech.
  * Dependencies & Sequential Order.
- **Multi-Agent Squad Assignment**: Categorizes each task under a specialized persona:
  * `Database & Data Architect`
  * `Backend & API Specialist`
  * `Frontend UI Specialist`
  * `Auth & Security Specialist`
  * `QA & Test Engineer`
  * `Full-Stack Generalist`
- **Dual View**: "Solo Developer Pipeline" (sequential linear order) and "Multi-Agent Squad" (grouped by specialized roles).

#### 4. Stage 4: Implement (Prompt Engineering & Export Hub)
- **Export Formats**:
  1. **Solo Dev Master Prompt**: All-in-one system prompt with markdown tables and step-by-step tasks ready for AI coding chat.
  2. **Isolated Agent Prompts**: Scoped instructions for each individual agent persona.
  3. **Multi-Agent Orchestrator Blueprint**: Coordination guidelines for multi-agent frameworks (LangChain, CrewAI, AutoGen).
  4. **Full Markdown Spec**: Complete readable documentation with one-click clipboard copy and `.md` file download.

---

### Visual Style & Design System:
- **Palette**: Warm neutral canvas (`#FDFCEC`), primary teal (`#00A99D`), coral action accent (`#F45D48`), subtle borders (`#EAE3C9`), high-contrast dark text (`#333333`).
- **Typography**: Clean, high-legibility sans-serif with clear mathematical hierarchies.
- **Controls**: Generous padding, rounded cards, tactile buttons with micro-interactions.
```
