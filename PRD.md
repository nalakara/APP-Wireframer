# Product Requirement Document (PRD)

## App Wireframer (AI Spec, Wireframe & Multi-Agent Task Architect)

- **Document Version:** 1.2.0
- **Status:** Approved / Production-Ready
- **Target Audience:** Solopreneurs, Product Managers, Vibe-Coders, Software Engineers, AI Builders
- **Tech Stack:** React 18, TypeScript, Tailwind CSS, Express.js Backend, Google Gemini 2.5 Flash, IndexedDB

---

## 1. Executive Summary & Problem Statement

### 1.1 Problem Statement
1. **Unstructured AI Vibe-Coding:** Prompting AI models (ChatGPT, Claude, Cursor) with vague, single-paragraph ideas often leads to chaotic software architecture, unmodular codebases, and frequent model hallucinations.
2. **High Friction in Early Spec Design:** Solo builders and non-technical founders struggle to define formal user stories, relational data schemas, and UI wireframes before writing code.
3. **Multi-Agent Task Allocation Complexity:** Modern AI development tools (e.g. CrewAI, AutoGen, LangGraph) require clear role segregation, but manual prompt partitioning is tedious.

### 1.2 Solution
App Wireframer is a 4-step progressive wizard application that converts high-level software ideas into:
- Validated PRD specifications and user stories.
- Low-fidelity interactive wireframes with database schema recommendations.
- Modular task tickets assigned to specialized AI agent roles.
- Deterministic, zero-fluff Master Prompts & orchestration blueprints ready for instant code generation.

---

## 2. User Personas

| Persona | Role | Key Pain Point | Solution in App |
| :--- | :--- | :--- | :--- |
| **Alex (The Vibe-Coder)** | Indie Hacker / Solopreneur | AI generates broken code due to missing schema details | Generates complete, step-by-step master prompts with acceptance criteria |
| **Budi (The Product Manager)** | Tech PM / Product Designer | Takes hours to draft initial PRD documents and user flows | Instant AI generation of executive summaries, user stories, and Markdown spec |
| **Devi (The Engineering Lead)** | Tech Lead / System Architect | Junior devs or AI squads don't have clear role boundaries | Generates isolated system instructions per agent persona (DB, UI, Backend, QA) |

---

## 3. Core Functional Requirements by Stage

### Stage 1: Specification (Specify)
- **FR-1.1:** Collect app name, app concept description, target audience, problem statement, and localization preferences (languages, currencies, measurement units).
- **FR-1.2:** Invoke Gemini API (`/api/gemini/specify`) to generate structured JSON comprising:
  - *Project Overview*
  - *User Stories* (`As a [role], I want [action], so that [benefit]`)
  - *Functional Requirements*
- **FR-1.3:** Provide an inline editable interface allowing users to modify, add, or delete individual user stories and requirements.
- **FR-1.4:** Quick Action Bar with sample data loaders (Bahasa Indonesia & English) and AI-powered full project translation.

### Stage 2: Architecture & Wireframing (Plan)
- **FR-2.1:** Enable multi-selection of standard application features (Auth, Social Login, Push Notifications, Dark Mode, Payment Gateway, Chat, Offline Support, etc.).
- **FR-2.2:** Configure Non-Functional Requirements (NFRs) across Security, Performance, and Scalability dimensions.
- **FR-2.3:** Generate visual Low-Fidelity Wireframes rendered in an interactive smartphone frame:
  - Supports component types: `header`, `card`, `hero`, `list`, `chart`, `tabs`, `chat`, `form`, `button`, `footer`.
  - Clicking any element launches a live *Component Inspector* detailing component purpose and layout parameters.
- **FR-2.4:** Produce Markdown-formatted Data Models and 3rd-Party Integration lists.

### Stage 3: Task & Agent Squad Architecture (Task)
- **FR-3.1:** Deconstruct all specifications into atomic task units with:
  - Task Title & Category
  - Acceptance Criteria
  - Required Tools & Technologies
  - Upstream Dependencies
  - Execution Order Sequence
- **FR-3.2:** Allocate each task to a specific AI Specialist Persona:
  - `Database & Data Architect`
  - `Backend & API Specialist`
  - `Frontend UI Specialist`
  - `Auth & Security Specialist`
  - `QA & Test Engineer`
  - `Full-Stack Generalist`
- **FR-3.3:** Provide dual-view visualization:
  - *Solo Developer Pipeline*: Linear ordered sequence.
  - *Multi-Agent Squad View*: Grouped by agent role with visual agent badges.

### Stage 4: Implementation & Export Hub (Implement)
- **FR-4.1:** Generate **Solo Dev Master Prompt** containing complete context for single-thread AI coding assistants.
- **FR-4.2:** Generate **Isolated Agent Prompts** scoped strictly to individual role responsibilities.
- **FR-4.3:** Generate **Multi-Agent Orchestrator Blueprint** designed for agentic frameworks.
- **FR-4.4:** Generate **Full Markdown Specification Document** with one-click clipboard copy and `.md` file download.

---

## 4. Non-Functional Requirements (NFR)

1. **Security & API Protection:**
   - The Google Gemini API key must never be exposed to the client browser. All generation requests must route through the server-side Express proxy.
2. **Data Persistence:**
   - Multi-project management with zero cloud latency using client-side **IndexedDB**.
   - Automatic debounced synchronization (1-second delay) on every input change.
3. **Usability & Navigation:**
   - Smooth auto-scroll to the top (`window.scrollTo`) when transitioning between wizard stages.
   - 100% full bilingual localization (Indonesian & English) across both UI labels and AI generation prompts.
4. **Performance:**
   - Fast cold-start with minimal runtime overhead.
   - Reactive state management with zero infinite re-renders.
