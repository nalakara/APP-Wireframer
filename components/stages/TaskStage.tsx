import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppData, Task, AgentRoleType } from '../../types';
import Button from '../Button';
import { generateTaskContent } from '../../services/geminiService';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { getAgentConfig, AGENT_ROLES_CONFIG } from '../AgentBadge';
import { useLanguage } from '../../services/i18n';

interface TaskStageProps {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
}

type ViewMode = 'both' | 'solo' | 'squad';

const AVAILABLE_ROLES: AgentRoleType[] = [
  'Database & Data Architect',
  'Backend & API Specialist',
  'Frontend UI Specialist',
  'Auth & Security Specialist',
  'QA & Test Engineer',
  'Lead / Orchestrator',
  'Full-Stack Generalist',
];

const TaskStage: React.FC<TaskStageProps> = ({ appData, setAppData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string>('all');
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const fetchTasks = useCallback(async (force = false) => {
    if (appData.generatedTasks.length > 0 && !force) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const tasks = await generateTaskContent(appData.plan.features, appData.generatedSpecify.requirements, language);
      setAppData(prev => ({ ...prev, generatedTasks: tasks }));
    } catch (e: any) {
      if (e?.message === 'API_KEY_MISSING') {
        setError(t.specify.apiKeyMissing);
      } else {
        setError(e?.message || (language === 'id' ? 'Gagal menghasilkan tugas. Silakan coba lagi.' : 'Failed to generate tasks. Please try again.'));
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [appData.plan.features, appData.generatedSpecify.requirements, appData.generatedTasks.length, setAppData, language, t.specify.apiKeyMissing]);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskChange = (index: number, field: keyof Task, value: any) => {
    const newTasks = [...appData.generatedTasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setAppData(prev => ({ ...prev, generatedTasks: newTasks }));
  };
  
  const handleCriteriaChange = (taskIndex: number, critIndex: number, value: string) => {
    const newTasks = [...appData.generatedTasks];
    const newCriteria = [...newTasks[taskIndex].criteria];
    newCriteria[critIndex] = value;
    newTasks[taskIndex] = { ...newTasks[taskIndex], criteria: newCriteria };
    setAppData(prev => ({ ...prev, generatedTasks: newTasks }));
  };

  const handleAddTask = () => {
    const nextOrder = (appData.generatedTasks.length || 0) + 1;
    const newTask: Task = { 
      title: language === 'id' ? 'Tugas Modular Baru' : 'New Modular Task', 
      criteria: [language === 'id' ? 'Tentukan kriteria penerimaan spesifik.' : 'Define specific acceptance criterion.'],
      agentRole: 'Full-Stack Generalist',
      agentPersona: language === 'id' ? 'Mengeksekusi pengembangan umum, integrasi komponen, dan pengujian.' : 'Executes general development, component assembly, and testing.',
      toolsRequired: ['file_system', 'terminal'],
      dependencies: [],
      executionOrder: nextOrder,
    };
    setAppData(prev => ({ ...prev, generatedTasks: [...prev.generatedTasks, newTask] }));
    setEditingTaskIndex(appData.generatedTasks.length);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = appData.generatedTasks.filter((_, i) => i !== index);
    setAppData(prev => ({ ...prev, generatedTasks: newTasks }));
  };
  
  const handleAddCriterion = (taskIndex: number) => {
    const newTasks = [...appData.generatedTasks];
    newTasks[taskIndex].criteria.push(language === 'id' ? 'Kriteria penerimaan baru.' : 'New acceptance criterion.');
    setAppData(prev => ({ ...prev, generatedTasks: newTasks }));
  };

  const handleDeleteCriterion = (taskIndex: number, critIndex: number) => {
    const newTasks = [...appData.generatedTasks];
    newTasks[taskIndex].criteria = newTasks[taskIndex].criteria.filter((_, i) => i !== critIndex);
    setAppData(prev => ({ ...prev, generatedTasks: newTasks }));
  };

  // Group tasks by Agent Role for the Squad breakdown
  const agentGroups = useMemo(() => {
    const groups: { [role: string]: { role: string; tasks: { task: Task; originalIndex: number }[] } } = {};
    
    appData.generatedTasks.forEach((task, index) => {
      const role = task.agentRole || 'Full-Stack Generalist';
      if (!groups[role]) {
        groups[role] = { role, tasks: [] };
      }
      groups[role].tasks.push({ task, originalIndex: index });
    });
    
    return Object.values(groups);
  }, [appData.generatedTasks]);

  const uniqueAgentRoles = useMemo(() => {
    const set = new Set<string>();
    appData.generatedTasks.forEach(t => {
      if (t.agentRole) set.add(t.agentRole);
    });
    return Array.from(set);
  }, [appData.generatedTasks]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <Loader className="h-12 w-12 border-4 !border-[#00A99D] border-b-transparent"/>
        <p className="mt-4 text-lg text-gray-700 font-semibold">{t.task.loadingTitle}</p>
        <p className="text-gray-500 text-sm">{t.task.loadingSubtitle}</p>
      </div>
    );
  }
  
  if (error) {
     return (
       <div className="text-red-600 text-center p-6 bg-red-50 rounded-lg border border-red-200">
         <p className="font-semibold mb-2">{error}</p>
         <Button onClick={() => fetchTasks(true)} className="mt-2">{t.task.retryBtn}</Button>
       </div>
     );
  }

  return (
    <div>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl text-[#333333] tracking-wider">{t.task.title}</h2>
            <span className="bg-[#EAE3C9] text-gray-700 text-xs px-2.5 py-1 rounded-full font-bold">
              {appData.generatedTasks.length} {t.task.tasksCountBadge}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {t.task.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-stretch md:self-auto justify-between md:justify-end">
          {/* View Mode Switcher */}
          <div className="flex bg-[#EAE3C9]/70 p-1 rounded-full border border-[#D1CBB8] text-xs font-bold">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'both' ? 'bg-[#00A99D] text-white shadow-sm' : 'text-gray-700 hover:text-black'
              }`}
            >
              <Icon name="spark" className="h-3.5 w-3.5" />
              {t.task.viewUnified}
            </button>
            <button
              onClick={() => setViewMode('solo')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'solo' ? 'bg-[#00A99D] text-white shadow-sm' : 'text-gray-700 hover:text-black'
              }`}
            >
              <Icon name="user" className="h-3.5 w-3.5" />
              {t.task.viewSolo}
            </button>
            <button
              onClick={() => setViewMode('squad')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'squad' ? 'bg-[#00A99D] text-white shadow-sm' : 'text-gray-700 hover:text-black'
              }`}
            >
              <Icon name="bot" className="h-3.5 w-3.5" />
              {t.task.viewSquad}
            </button>
          </div>

          <button 
            onClick={() => fetchTasks(true)} 
            disabled={isLoading}
            className="px-3.5 py-1.5 bg-white border border-[#EAE3C9] text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50"
            title={t.task.regenerateTasksBtn}
          >
            <Icon name="sparkles" className="h-3.5 w-3.5 text-[#FF7A59]" />
            {t.task.regenerateTasksBtn}
          </button>

          <button 
            onClick={handleAddTask} 
            className="px-3.5 py-1.5 bg-transparent border-2 border-[#00A99D] text-[#00A99D] rounded-full hover:bg-[#00A99D] hover:text-white transition-all duration-300 flex items-center gap-1.5 uppercase text-xs font-bold tracking-wider cursor-pointer"
          >
            <Icon name="add" className="h-4 w-4" />
            {t.task.addTaskBtn}
          </button>
        </div>
      </div>

      {/* Filter bar for Squad view */}
      {viewMode !== 'solo' && uniqueAgentRoles.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs">
          <span className="text-gray-500 font-semibold flex-shrink-0">{t.task.filterAgent}:</span>
          <button
            onClick={() => setSelectedAgentFilter('all')}
            className={`px-2.5 py-1 rounded-full transition-colors flex-shrink-0 ${
              selectedAgentFilter === 'all'
                ? 'bg-gray-800 text-white font-bold'
                : 'bg-white/80 text-gray-600 border border-[#EAE3C9] hover:bg-gray-100'
            }`}
          >
            {t.task.allAgents} ({appData.generatedTasks.length})
          </button>
          {uniqueAgentRoles.map(role => {
            const config = getAgentConfig(role);
            const count = appData.generatedTasks.filter(t => t.agentRole === role).length;
            const isActive = selectedAgentFilter === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedAgentFilter(role)}
                className={`px-2.5 py-1 rounded-full transition-all flex-shrink-0 flex items-center gap-1.5 border ${
                  isActive
                    ? `${config.bg} ${config.color} ${config.border} ring-2 ring-[#00A99D] font-bold`
                    : 'bg-white/80 text-gray-700 border-[#EAE3C9] hover:bg-gray-50'
                }`}
              >
                <span>{config.avatarIcon}</span>
                <span>{role}</span>
                <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW 1: SQUAD BOARD VIEW */}
      {viewMode === 'squad' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[62vh] overflow-y-auto pr-2">
          {agentGroups
            .filter(group => selectedAgentFilter === 'all' || group.role === selectedAgentFilter)
            .map(group => {
              const config = getAgentConfig(group.role);
              return (
                <div 
                  key={group.role} 
                  className={`rounded-xl border ${config.border} ${config.bg}/40 p-4 flex flex-col shadow-sm transition-all`}
                >
                  {/* Agent Header */}
                  <div className="flex items-start justify-between border-b pb-3 mb-3 border-gray-200/60">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-lg bg-white shadow-xs border border-gray-200 flex items-center justify-center text-lg">
                        {config.avatarIcon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base leading-tight ${config.color}`}>
                          {group.role}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{config.description}</p>
                      </div>
                    </div>
                    <span className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold border border-gray-200">
                      {group.tasks.length} {t.task.tasksCountBadge}
                    </span>
                  </div>

                  {/* Task list for this agent */}
                  <div className="space-y-3 flex-1">
                    {group.tasks.map(({ task, originalIndex }) => (
                      <div 
                        key={originalIndex} 
                        className="bg-white rounded-lg p-3.5 border border-[#EAE3C9] shadow-2xs hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                            #{task.executionOrder || originalIndex + 1}
                          </span>
                          <input
                            value={task.title}
                            onChange={(e) => handleTaskChange(originalIndex, 'title', e.target.value)}
                            className="font-bold text-gray-800 text-sm flex-1 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                            placeholder={language === 'id' ? 'Judul Tugas' : 'Task Title'}
                          />
                          <button
                            onClick={() => handleDeleteTask(originalIndex)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                            aria-label={`Delete task ${task.title}`}
                          >
                            <Icon name="delete" className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Criteria */}
                        <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 pl-1 mb-2">
                          {task.criteria.map((crit, critIndex) => (
                            <li key={critIndex} className="flex items-center group">
                              <span className="mr-1.5 text-gray-400">•</span>
                              <input
                                value={crit}
                                onChange={(e) => handleCriteriaChange(originalIndex, critIndex, e.target.value)}
                                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-xs text-gray-700"
                              />
                              <button
                                onClick={() => handleDeleteCriterion(originalIndex, critIndex)}
                                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 text-xs ml-1"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                          <button
                            onClick={() => handleAddCriterion(originalIndex)}
                            className="text-[#00A99D] hover:underline font-bold"
                          >
                            {t.task.addCriterionBtn}
                          </button>
                          {task.toolsRequired && task.toolsRequired.length > 0 && (
                            <div className="flex gap-1">
                              {task.toolsRequired.map(tool => (
                                <span key={tool} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        /* VIEW 2: UNIFIED / SOLO DEV ACCORDION LIST */
        <div className="space-y-3 max-h-[62vh] overflow-y-auto pr-2">
          {appData.generatedTasks.map((task, index) => {
            const agentConfig = getAgentConfig(task.agentRole);
            const isEditing = editingTaskIndex === index;

            return (
              <div 
                key={index} 
                className="bg-white/80 border border-[#EAE3C9] rounded-xl p-4 shadow-xs hover:border-[#00A99D]/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    <span className="h-7 w-7 rounded-full bg-[#EAE3C9] text-gray-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      {task.executionOrder || index + 1}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          type="text"
                          value={task.title}
                          onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                          className="font-bold text-gray-800 text-base bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#00A99D] focus:outline-none transition py-0.5"
                          placeholder={language === 'id' ? 'Judul Tugas' : 'Task Title'}
                        />

                        {/* Agent Role Badge in Unified View */}
                        {viewMode !== 'solo' && (
                          <div className="flex items-center gap-1.5">
                            <span 
                              className={`text-xs px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1 ${agentConfig.bg} ${agentConfig.color} ${agentConfig.border}`}
                              title={task.agentPersona}
                            >
                              <span>{agentConfig.avatarIcon}</span>
                              <span>{task.agentRole || 'Full-Stack'}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Squad Persona Tooltip/Description */}
                      {viewMode !== 'solo' && task.agentPersona && (
                        <p className="text-xs text-gray-500 italic mt-0.5 flex items-center gap-1">
                          <span>🎯</span> {task.agentPersona}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setEditingTaskIndex(isEditing ? null : index)}
                      className="text-xs text-gray-500 hover:text-[#00A99D] font-semibold px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      {isEditing ? t.task.doneBtn : t.task.editAgentBtn}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                      aria-label={`Delete task ${task.title}`}
                    >
                      <Icon name="delete" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Agent Config (Role selector, dependencies, tools) */}
                {isEditing && (
                  <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FDFCEC]/60 p-3 rounded-lg text-xs">
                    <div>
                      <label className="font-bold text-gray-600 block mb-1">{t.task.assignedRoleLabel}</label>
                      <select
                        value={task.agentRole || 'Full-Stack Generalist'}
                        onChange={(e) => handleTaskChange(index, 'agentRole', e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs text-gray-800"
                      >
                        {AVAILABLE_ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-gray-600 block mb-1">{t.task.requiredToolsLabel}</label>
                      <input
                        type="text"
                        value={(task.toolsRequired || []).join(', ')}
                        onChange={(e) => handleTaskChange(index, 'toolsRequired', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="e.g. file_system, bash"
                        className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-600 block mb-1">{t.task.executionOrderLabel}</label>
                      <input
                        type="number"
                        value={task.executionOrder || index + 1}
                        onChange={(e) => handleTaskChange(index, 'executionOrder', parseInt(e.target.value) || 1)}
                        className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Acceptance Criteria Sub-items */}
                <div className="mt-3 pl-2 sm:pl-10 space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    {t.task.criteriaHeader}
                  </span>
                  {task.criteria.map((crit, critIndex) => (
                    <div key={critIndex} className="flex items-center gap-2 group text-xs text-gray-700">
                      <input type="checkbox" className="h-3.5 w-3.5 rounded text-[#00A99D] focus:ring-0 border-gray-300" />
                      <input
                        type="text"
                        value={crit}
                        onChange={(e) => handleCriteriaChange(index, critIndex, e.target.value)}
                        className="flex-1 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#00A99D] focus:outline-none transition py-0.5"
                      />
                      <button
                        onClick={() => handleDeleteCriterion(index, critIndex)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 p-0.5"
                        aria-label="Remove criterion"
                      >
                        <Icon name="delete" className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddCriterion(index)}
                    className="text-[#00A99D] hover:text-[#007c73] font-bold text-xs flex items-center gap-1 mt-1.5"
                  >
                    <Icon name="add" className="h-3.5 w-3.5" />
                    {t.task.addCriterionBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskStage;
