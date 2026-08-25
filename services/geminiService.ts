import { AppData, Task } from '../types';

export async function generateSpecifyContent(
  idea: AppData['idea'],
  localization: AppData['localization'],
  language: string = 'en'
): Promise<AppData['generatedSpecify']> {
  const response = await fetch("/api/gemini/specify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, localization, language }),
  });

  if (!response.ok) {
    let errMsg = "Failed to generate specify content";
    try {
      const errData = await response.json();
      if (errData.error === "API_KEY_MISSING" || (errData.error && errData.error.includes("API_KEY_MISSING"))) {
        throw new Error("API_KEY_MISSING");
      }
      errMsg = errData.error || errMsg;
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING") throw e;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
}

export async function generatePlanContent(
  plan: AppData['plan'], 
  requirements: string[],
  language: string = 'en'
): Promise<AppData['generatedPlan']> {
  const response = await fetch("/api/gemini/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, requirements, language }),
  });

  if (!response.ok) {
    let errMsg = "Failed to generate plan content";
    try {
      const errData = await response.json();
      if (errData.error === "API_KEY_MISSING" || (errData.error && errData.error.includes("API_KEY_MISSING"))) {
        throw new Error("API_KEY_MISSING");
      }
      errMsg = errData.error || errMsg;
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING") throw e;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
}

export async function generateTaskContent(
  features: string[],
  requirements: string[],
  language: string = 'en'
): Promise<Task[]> {
  const response = await fetch("/api/gemini/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features, requirements, language }),
  });

  if (!response.ok) {
    let errMsg = "Failed to generate tasks";
    try {
      const errData = await response.json();
      if (errData.error === "API_KEY_MISSING" || (errData.error && errData.error.includes("API_KEY_MISSING"))) {
        throw new Error("API_KEY_MISSING");
      }
      errMsg = errData.error || errMsg;
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING") throw e;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
}

export async function translateProjectContent(
  appData: AppData,
  targetLanguage: string = 'id'
): Promise<AppData> {
  const response = await fetch("/api/gemini/translate-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appData, targetLanguage }),
  });

  if (!response.ok) {
    let errMsg = "Failed to translate project";
    try {
      const errData = await response.json();
      if (errData.error === "API_KEY_MISSING" || (errData.error && errData.error.includes("API_KEY_MISSING"))) {
        throw new Error("API_KEY_MISSING");
      }
      errMsg = errData.error || errMsg;
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING") throw e;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
}
