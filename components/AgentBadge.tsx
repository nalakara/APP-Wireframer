import React from 'react';
import { AgentRoleType } from '../types';

export interface AgentBadgeInfo {
  role: AgentRoleType | string;
  color: string;
  bg: string;
  border: string;
  avatarIcon: string;
  description: string;
}

export const AGENT_ROLES_CONFIG: Record<string, AgentBadgeInfo> = {
  'Database & Data Architect': {
    role: 'Database & Data Architect',
    color: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    avatarIcon: '🗄️',
    description: 'Data schemas, state cache, ORM structures, and offline persistence.',
  },
  'Backend & API Specialist': {
    role: 'Backend & API Specialist',
    color: 'text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    avatarIcon: '⚙️',
    description: 'Server routes, 3rd party APIs, data validations, and business logic.',
  },
  'Frontend UI Specialist': {
    role: 'Frontend UI Specialist',
    color: 'text-teal-800',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    avatarIcon: '🎨',
    description: 'Component layout, responsive styling, interaction design, and visual polish.',
  },
  'Auth & Security Specialist': {
    role: 'Auth & Security Specialist',
    color: 'text-rose-800',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    avatarIcon: '🛡️',
    description: 'Authentication tokens, session security, permissions, and route guards.',
  },
  'QA & Test Engineer': {
    role: 'QA & Test Engineer',
    color: 'text-purple-800',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    avatarIcon: '🧪',
    description: 'Unit tests, acceptance criteria assertions, mocks, and edge cases.',
  },
  'Lead / Orchestrator': {
    role: 'Lead / Orchestrator',
    color: 'text-indigo-800',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    avatarIcon: '👑',
    description: 'Task coordination, architectural decisions, and agent workflow sequencing.',
  },
  'Full-Stack Generalist': {
    role: 'Full-Stack Generalist',
    color: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    avatarIcon: '⚡',
    description: 'End-to-end implementation across frontend, backend, and integration glue.',
  },
};

export const DEFAULT_AGENT_CONFIG: AgentBadgeInfo = {
  role: 'Full-Stack Generalist',
  color: 'text-gray-800',
  bg: 'bg-gray-100',
  border: 'border-gray-300',
  avatarIcon: '🤖',
  description: 'Handles cross-functional development tasks.',
};

export function getAgentConfig(roleName?: string): AgentBadgeInfo {
  if (!roleName) return DEFAULT_AGENT_CONFIG;
  return AGENT_ROLES_CONFIG[roleName] || {
    ...DEFAULT_AGENT_CONFIG,
    role: roleName,
  };
}
