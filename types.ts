
export enum Stage {
  Specify,
  Plan,
  Task,
  Implement,
}

export type AgentRoleType = 
  | 'Lead / Orchestrator'
  | 'Frontend UI Specialist'
  | 'Backend & API Specialist'
  | 'Database & Data Architect'
  | 'Auth & Security Specialist'
  | 'QA & Test Engineer'
  | 'Full-Stack Generalist';

export interface WireframeElement {
  id: string;
  type: 'header' | 'navbar' | 'hero' | 'card' | 'list' | 'form' | 'button' | 'search' | 'chart' | 'tabs' | 'sidebar' | 'footer' | 'chat' | 'custom';
  label: string;
  description?: string;
  subElements?: string[];
}

export interface WireframeScreen {
  id: string;
  name: string;
  deviceType?: 'mobile' | 'desktop';
  purpose: string;
  elements: WireframeElement[];
}

export interface UserFlowStep {
  step: number;
  screen: string;
  action: string;
  outcome: string;
}

export interface Task {
  title: string;
  criteria: string[];
  agentRole?: AgentRoleType | string;
  agentPersona?: string;
  toolsRequired?: string[];
  dependencies?: string[];
  executionOrder?: number;
}

export interface AppData {
  idea: {
    name: string;
    about: string;
    audience: string;
    problem: string;
  };
  localization: {
    languages: string;
    currencies: string;
    measurement: 'metric' | 'imperial' | 'both' | 'na';
  };
  generatedSpecify: {
    overview: string;
    userStories: string[];
    requirements: string[];
  };
  plan: {
    features: string[];
    isOffline: boolean;
    homeScreen: string;
    nfrs: {
      security: string;
      performance: string;
      scalability: string;
    };
  };
  generatedPlan: {
    dataModels: string;
    apiNeeds: string;
    uiUxNotes: string;
    wireframes?: WireframeScreen[];
    userFlow?: UserFlowStep[];
    selectedTechStack?: string;
  };
  generatedTasks: Task[];
}
