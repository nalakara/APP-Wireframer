import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper to initialize Gemini SDK
  let aiInstance: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiInstance) {
      const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!key) {
        throw new Error("API_KEY_MISSING");
      }
      aiInstance = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiInstance;
  }

  const model = 'gemini-3.5-flash';

  // API Route for Specify Stage
  app.post("/api/gemini/specify", async (req, res) => {
    try {
      const { idea, localization, language } = req.body;
      const isIndonesian = language === 'id';

      const localizationPrompt = `
        Consider the following localization requirements:
        - Supported Languages: ${localization?.languages || 'Not specified.'}
        - Supported Currencies: ${localization?.currencies || 'Not specified.'}
        - Measurement System: ${localization?.measurement === 'na' ? 'Not applicable.' : localization?.measurement}
      `;
      
      const languageDirective = isIndonesian
        ? `CRITICAL LANGUAGE REQUIREMENT:
           You MUST respond 100% in BAHASA INDONESIA. Even if the input app idea or name is written in English or mixed, you MUST write the entire overview, user stories, and requirements in fluent, professional, and natural BAHASA INDONESIA.
           - Overview: Tulis ringkasan proyek yang komprehensif dalam Bahasa Indonesia formal dan bergaya produk teknologi modern.
           - User Stories: Gunakan format baku Bahasa Indonesia: "Sebagai [peran pengguna], saya ingin [tindakan] agar [manfaat/tujuan]."
           - Requirements: Tulis kalimat kebutuhan fungsional dalam Bahasa Indonesia yang lugas dan terukur.`
        : `Write the overview, user stories, and requirements in clear, concise, and professional English.
           - Format user stories as: "As a [user], I want to [action] so that [benefit]."`;

      const prompt = `
        Based on the following app idea, generate a project overview, user stories, and functional requirements.
        App Name: ${idea?.name || 'Untitled App'}
        App Description: ${idea?.about || ''}
        Target Audience: ${idea?.audience || ''}
        Problem to Solve: ${idea?.problem || ''}
        ${localizationPrompt}
        
        ${languageDirective}
      `;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overview: { type: Type.STRING, description: 'A comprehensive, professional project overview in the requested language.' },
              userStories: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of 4-6 specific user stories in the requested language.',
              },
              requirements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of 4-6 key functional requirements in the requested language.',
              },
            },
            required: ['overview', 'userStories', 'requirements'],
          },
        },
      });

      if (!response.text) {
        throw new Error("No text returned from Gemini");
      }
      const jsonResponse = JSON.parse(response.text);
      res.json(jsonResponse);
    } catch (error: any) {
      console.error("Error in /api/gemini/specify:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // API Route for Plan Stage
  app.post("/api/gemini/plan", async (req, res) => {
    try {
      const { plan, requirements, language } = req.body;
      const isIndonesian = language === 'id';

      const languageDirective = isIndonesian
        ? `CRITICAL LANGUAGE REQUIREMENT:
           You MUST respond 100% in BAHASA INDONESIA for all textual content:
           - UI/UX Notes: Tulis dalam Bahasa Indonesia yang profesional dan mendalam.
           - Data Models: Kolom deskripsi dan catatan dalam Bahasa Indonesia.
           - API Needs: Penjelasan kebutuhan API pihak ketiga dalam Bahasa Indonesia.
           - User Flow: Nama layar ('screen'), aksi ('action'), dan hasil sistem ('outcome') WAJIB dalam Bahasa Indonesia.
           - Wireframes: Nama layar, purpose, label komponen ('label'), dan deskripsi komponen ('description') WAJIB dalam Bahasa Indonesia.`
        : `Output all UI/UX notes, data models, screen names, purposes, component labels, and user flow in professional English.`;

      const prompt = `
        Given the app's functional requirements, chosen features, and home screen description, generate:
        1. Suggested Data Models (in markdown table format).
        2. Potential 3rd-party API Needs.
        3. UI/UX design notes & best practices.
        4. User Flow journey (3-5 sequential steps showing screen transitions, user action, and outcome).
        5. Visual Low-Fidelity Wireframes for 2 to 4 core screens (e.g. Home Dashboard, Detail/Feed view, Action/Form modal).
           For each screen, provide a list of visual UI components (types: 'header', 'navbar', 'hero', 'card', 'list', 'form', 'button', 'search', 'chart', 'tabs', 'chat', 'sidebar', 'footer') with labels and descriptions.

        Functional Requirements: ${requirements?.join(', ') || ''}
        Selected Features: ${plan?.features?.join(', ') || ''}
        Offline Capability: ${plan?.isOffline ? 'Required' : 'Not Required'}
        Main Home Screen View: ${plan?.homeScreen || ''}
        Non-Functional Requirements:
        - Security: ${plan?.nfrs?.security || 'Not specified.'}
        - Performance: ${plan?.nfrs?.performance || 'Not specified.'}
        - Scalability: ${plan?.nfrs?.scalability || 'Not specified.'}

        ${languageDirective}
      `;
      
      const ai = getAI();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              dataModels: { type: Type.STRING, description: 'Suggest simple data models with key fields in markdown format.' },
              apiNeeds: { type: Type.STRING, description: 'List potential third-party APIs needed.' },
              uiUxNotes: { type: Type.STRING, description: 'High-level UI/UX recommendations and notes.' },
              selectedTechStack: { type: Type.STRING, description: 'Recommended modern frontend/backend tech stack.' },
              userFlow: {
                type: Type.ARRAY,
                description: 'Step-by-step user journey flow.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.INTEGER },
                    screen: { type: Type.STRING },
                    action: { type: Type.STRING },
                    outcome: { type: Type.STRING }
                  },
                  required: ['step', 'screen', 'action', 'outcome']
                }
              },
              wireframes: {
                type: Type.ARRAY,
                description: 'List of core app screens with low-fi UI layout elements.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    deviceType: { type: Type.STRING, description: "'mobile' or 'desktop'" },
                    purpose: { type: Type.STRING },
                    elements: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          type: { 
                            type: Type.STRING, 
                            description: "'header' | 'navbar' | 'hero' | 'card' | 'list' | 'form' | 'button' | 'search' | 'chart' | 'tabs' | 'sidebar' | 'footer' | 'chat' | 'custom'" 
                          },
                          label: { type: Type.STRING },
                          description: { type: Type.STRING }
                        },
                        required: ['id', 'type', 'label']
                      }
                    }
                  },
                  required: ['id', 'name', 'purpose', 'elements']
                }
              }
            },
            required: ['dataModels', 'apiNeeds', 'uiUxNotes', 'wireframes', 'userFlow'],
          },
        },
      });

      if (!response.text) {
        throw new Error("No text returned from Gemini");
      }
      const jsonResponse = JSON.parse(response.text);
      res.json(jsonResponse);
    } catch (error: any) {
      console.error("Error in /api/gemini/plan:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // API Route for Task Stage
  app.post("/api/gemini/tasks", async (req, res) => {
    try {
      const { features, requirements, language } = req.body;
      const isIndonesian = language === 'id';

      const languageDirective = isIndonesian
        ? `CRITICAL LANGUAGE REQUIREMENT:
           Output task titles, acceptance criteria, and agent persona descriptions 100% in BAHASA INDONESIA.
           Keep agentRole values as standard English keys ('Database & Data Architect', 'Backend & API Specialist', 'Frontend UI Specialist', 'Auth & Security Specialist', 'QA & Test Engineer', 'Lead / Orchestrator', 'Full-Stack Generalist') so the UI badges display with proper color tags.`
        : `Output task titles, acceptance criteria, and agent persona descriptions in clear, professional English.`;

      const prompt = `
        Break down the following app features and requirements into a checklist of development tasks that can be executed either sequentially by a Solo Developer or assigned autonomously to specialized AI Agents (Multi-Agent Squad).
        
        Features: ${features?.join(', ') || ''}
        Requirements: ${requirements?.join(', ') || ''}

        For each task, assign:
        1. A clear action-oriented title.
        2. 2-4 testable acceptance criteria.
        3. The most suitable specialized Agent Role ('Database & Data Architect', 'Backend & API Specialist', 'Frontend UI Specialist', 'Auth & Security Specialist', 'QA & Test Engineer', or 'Full-Stack Generalist').
        4. A 1-sentence Agent Persona description.
        5. Tools required by the agent.
        6. Direct dependencies.
        7. Logical execution order (1, 2, 3...).

        ${languageDirective}
      `;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'An array of development tasks with agent delegation metadata.',
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A concise, action-oriented title for the task." },
                criteria: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "A list of 2-4 specific acceptance criteria for the task."
                },
                agentRole: { 
                  type: Type.STRING, 
                  description: "Specialized role name."
                },
                agentPersona: {
                  type: Type.STRING,
                  description: "Brief 1-sentence mission/persona for this agent in target language."
                },
                toolsRequired: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of tools/capabilities needed by the agent."
                },
                dependencies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Tasks or milestones that must be completed prior to this task."
                },
                executionOrder: {
                  type: Type.INTEGER,
                  description: "Suggested sequential execution order index."
                }
              },
              required: ['title', 'criteria', 'agentRole', 'agentPersona', 'toolsRequired', 'dependencies', 'executionOrder']
            }
          }
        }
      });

      if (!response.text) {
        throw new Error("No text returned from Gemini");
      }
      const jsonResponse = JSON.parse(response.text);
      res.json(jsonResponse);
    } catch (error: any) {
      console.error("Error in /api/gemini/tasks:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // API Route to Translate Complete Project
  app.post("/api/gemini/translate-project", async (req, res) => {
    try {
      const { appData, targetLanguage } = req.body;
      const isIndonesian = targetLanguage === 'id';

      const prompt = `
        You are a specialized localization engineer and system architect.
        Translate and adapt the following complete app project JSON specification to ${isIndonesian ? 'BAHASA INDONESIA' : 'ENGLISH'}.
        
        Translate:
        - idea (name, about, audience, problem)
        - localization (languages description, currencies description)
        - generatedSpecify (overview, userStories, requirements)
        - plan (homeScreen, nfrs.security, nfrs.performance, nfrs.scalability)
        - generatedPlan (dataModels, apiNeeds, uiUxNotes, userFlow screen/action/outcome, wireframes screen names/purpose/elements label & description)
        - generatedTasks (titles, criteria, agentPersona, dependencies)
        
        CRITICAL RULES:
        - Keep agentRole values EXACTLY as standard keys ('Database & Data Architect', 'Backend & API Specialist', 'Frontend UI Specialist', 'Auth & Security Specialist', 'QA & Test Engineer', 'Lead / Orchestrator', 'Full-Stack Generalist').
        - Keep wireframe element types intact (e.g. 'header', 'navbar', 'hero', 'card', 'list', 'form', 'button', 'search', 'chart', 'tabs', 'chat', 'sidebar', 'footer').
        - Maintain all array structures and object IDs intact.
        - Ensure natural, highly professional language suitable for production software specifications.

        Original Project JSON:
        ${JSON.stringify(appData)}
      `;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      if (!response.text) {
        throw new Error("No text returned from Gemini translation");
      }
      const jsonResponse = JSON.parse(response.text);
      res.json(jsonResponse);
    } catch (error: any) {
      console.error("Error in /api/gemini/translate-project:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
