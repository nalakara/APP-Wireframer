import React, { useMemo, useState } from 'react';
import { AppData, Task } from '../../types';
import { Icon } from '../Icon';
import MarkdownRenderer from '../MarkdownRenderer';
import { getAgentConfig } from '../AgentBadge';
import { useLanguage } from '../../services/i18n';

interface ImplementStageProps {
  appData: AppData;
}

type ExportTab = 'master' | 'agents' | 'orchestrator' | 'markdown';

const ImplementStage: React.FC<ImplementStageProps> = ({ appData }) => {
  const [activeTab, setActiveTab] = useState<ExportTab>('master');
  const [copyStatus, setCopyStatus] = useState('');
  const [selectedAgentRole, setSelectedAgentRole] = useState<string>('');
  const { language, t } = useLanguage();

  // Generate Base Markdown Spec
  const fullSpecMarkdown = useMemo(() => {
    const isId = language === 'id';
    let spec = `# ${isId ? 'Spesifikasi Aplikasi' : 'App Specification'}: ${appData.idea.name || (isId ? 'Aplikasi Saya' : 'My New App')}\n\n`;
    
    spec += `## 1. ${isId ? 'Ringkasan Proyek' : 'Project Overview'}\n`;
    spec += `${appData.generatedSpecify.overview}\n\n`;

    spec += `## 2. ${isId ? 'Kisah Pengguna (User Stories)' : 'User Stories'}\n`;
    appData.generatedSpecify.userStories.forEach(story => {
      spec += `- ${story}\n`;
    });
    spec += `\n`;

    spec += `## 3. ${isId ? 'Kebutuhan Fungsional' : 'Functional Requirements'}\n`;
    appData.generatedSpecify.requirements.forEach(req => {
      spec += `- ${req}\n`;
    });
    spec += `\n`;

    spec += `## 4. ${isId ? 'Fitur & Arsitektur' : 'Features & Architecture'}\n`;
    
    spec += `### ${isId ? 'Lokalisasi & Bahasa' : 'Localization'}\n`;
    spec += `- **${isId ? 'Bahasa yang Didukung' : 'Supported Languages'}:** ${appData.localization.languages || (isId ? 'Tidak ditentukan.' : 'Not specified.')}\n`;
    spec += `- **${isId ? 'Mata Uang yang Didukung' : 'Supported Currencies'}:** ${appData.localization.currencies || (isId ? 'Tidak ditentukan.' : 'Not specified.')}\n`;
    spec += `- **${isId ? 'Sistem Pengukuran' : 'Measurement System'}:** ${appData.localization.measurement === 'na' ? (isId ? 'Tidak berlaku.' : 'Not applicable.') : appData.localization.measurement.charAt(0).toUpperCase() + appData.localization.measurement.slice(1)}\n\n`;
    
    spec += `### ${isId ? 'Fitur Terpilih' : 'Selected Features'}\n`;
    appData.plan.features.forEach(feat => {
        spec += `- ${feat}\n`;
    });
    spec += `\n`;

    spec += `### ${isId ? 'Kebutuhan Non-Fungsional (NFR)' : 'Non-Functional Requirements'}\n`;
    spec += `- **${isId ? 'Keamanan' : 'Security'}:** ${appData.plan.nfrs.security || (isId ? 'Tidak ditentukan.' : 'Not specified.')}\n`;
    spec += `- **${isId ? 'Performa' : 'Performance'}:** ${appData.plan.nfrs.performance || (isId ? 'Tidak ditentukan.' : 'Not specified.')}\n`;
    spec += `- **${isId ? 'Skalabilitas' : 'Scalability'}:** ${appData.plan.nfrs.scalability || (isId ? 'Tidak ditentukan.' : 'Not specified.')}\n\n`;
    
    spec += `### ${isId ? 'Model Data' : 'Data Models'}\n${appData.generatedPlan.dataModels}\n\n`;
    spec += `### ${isId ? 'Kebutuhan API' : 'API Needs'}\n${appData.generatedPlan.apiNeeds}\n\n`;
    spec += `### ${isId ? 'Catatan UI/UX' : 'UI/UX Notes'}\n${appData.generatedPlan.uiUxNotes}\n\n`;

    if (appData.generatedPlan.userFlow && appData.generatedPlan.userFlow.length > 0) {
      spec += `### ${isId ? 'Alur Perjalanan Pengguna (User Flow)' : 'User Flow Journey'}\n`;
      appData.generatedPlan.userFlow.forEach(step => {
        spec += `${step.step}. **${step.screen}** ➔ *${isId ? 'Aksi' : 'Action'}:* ${step.action} ➔ *${isId ? 'Hasil' : 'Outcome'}:* ${step.outcome}\n`;
      });
      spec += `\n`;
    }

    if (appData.generatedPlan.wireframes && appData.generatedPlan.wireframes.length > 0) {
      spec += `### ${isId ? 'Wireframe Low-Fidelity & Rincian Komponen UI' : 'Low-Fidelity Wireframes & UI Component Breakdown'}\n`;
      appData.generatedPlan.wireframes.forEach(screen => {
        spec += `#### ${isId ? 'Layar' : 'Screen'}: ${screen.name} (${screen.deviceType || 'mobile'})\n`;
        spec += `- **${isId ? 'Tujuan' : 'Purpose'}:** ${screen.purpose}\n`;
        spec += `- **${isId ? 'Komponen Tata Letak' : 'Layout Components'}:\n`;
        screen.elements.forEach(elem => {
          spec += `  * \`[${elem.type}]\` **${elem.label}**${elem.description ? `: ${elem.description}` : ''}\n`;
        });
        spec += `\n`;
      });
    }

    spec += `## 5. ${isId ? 'Rincian Tugas Pengembangan & Alokasi Agen' : 'Development Tasks & Agent Allocation'}\n`;
    appData.generatedTasks.forEach((task, idx) => {
      spec += `### ${isId ? 'Tugas' : 'Task'} ${task.executionOrder || idx + 1}: ${task.title}\n`;
      if (task.agentRole) spec += `- **${isId ? 'Agen yang Ditugaskan' : 'Assigned Agent'}:** ${task.agentRole}\n`;
      if (task.agentPersona) spec += `- **${isId ? 'Fokus Peran Agen' : 'Agent Focus'}:** ${task.agentPersona}\n`;
      if (task.toolsRequired && task.toolsRequired.length > 0) spec += `- **${isId ? 'Alat yang Dibutuhkan' : 'Required Tools'}:** \`${task.toolsRequired.join('`, `')}\`\n`;
      if (task.dependencies && task.dependencies.length > 0) spec += `- **${isId ? 'Ketergantungan' : 'Dependencies'}:** ${task.dependencies.join(', ')}\n`;
      spec += `- **${isId ? 'Kriteria Penerimaan' : 'Acceptance Criteria'}:\n`;
      task.criteria.forEach(crit => {
        spec += `  * ${crit}\n`;
      });
      spec += `\n`;
    });
    
    return spec;
  }, [appData, language]);

  // Group tasks by agent role
  const agentRoleGroups = useMemo(() => {
    const map: Record<string, { role: string; persona?: string; tasks: Task[] }> = {};
    appData.generatedTasks.forEach(task => {
      const role = task.agentRole || 'Full-Stack Generalist';
      if (!map[role]) {
        map[role] = { role, persona: task.agentPersona, tasks: [] };
      }
      map[role].tasks.push(task);
    });
    return map;
  }, [appData.generatedTasks]);

  const uniqueAgentRoles = Object.keys(agentRoleGroups);

  // Set initial selected agent if empty
  React.useEffect(() => {
    if (uniqueAgentRoles.length > 0 && (!selectedAgentRole || !agentRoleGroups[selectedAgentRole])) {
      setSelectedAgentRole(uniqueAgentRoles[0]);
    }
  }, [uniqueAgentRoles, selectedAgentRole, agentRoleGroups]);

  // 1. Single Master Prompt (Solo Dev / All-in-one AI)
  const masterAiPrompt = useMemo(() => {
    if (language === 'id') {
      return `
Anda adalah insinyur perangkat lunak full-stack ahli dan arsitek sistem terkemuka.
Berdasarkan spesifikasi produk lengkap berikut, buat kode sumber lengkap yang siap produksi untuk aplikasi ini menggunakan React, TypeScript, dan Tailwind CSS.

Pastikan semua komponen modular, tertata rapi, dan memenuhi semua kriteria penerimaan.

================= SPESIFIKASI APLIKASI =================
${fullSpecMarkdown}
========================================================

Silakan tuliskan struktur kode sumber yang bersih berkas demi berkas.
      `.trim();
    }
    return `
You are an expert full-stack software engineer and system architect.
Based on the following comprehensive product specification, generate the complete, production-ready source code for this application using React, TypeScript, and Tailwind CSS.

Ensure all components are modular, fully styled, and meet all acceptance criteria.

================= APP SPECIFICATION =================
${fullSpecMarkdown}
====================================================

Please write out the clean codebase file by file.
    `.trim();
  }, [fullSpecMarkdown, language]);

  // 2. Orchestrator / Multi-Agent Blueprint
  const orchestratorPrompt = useMemo(() => {
    const isId = language === 'id';
    let text = `# ${isId ? 'Cetak Biru Orkestrator Multi-Agen' : 'Multi-Agent Orchestrator Blueprint'}: ${appData.idea.name || 'App'}\n\n`;
    text += `## ${isId ? 'Arsitektur Sistem & Konteks' : 'System Architecture & Context'}\n`;
    text += `${appData.generatedSpecify.overview}\n\n`;
    
    text += `## ${isId ? 'Daftar Agen Aktif (Squad Roster)' : 'Active Agent Squad Roster'}\n`;
    Object.values(agentRoleGroups).forEach((group, index) => {
      text += `### ${index + 1}. Agent: [${group.role}]\n`;
      text += `- **${isId ? 'Misi Utama' : 'Mission'}:** ${group.persona || (isId ? 'Mengeksekusi tugas domain yang ditugaskan' : 'Execute designated domain tasks')}\n`;
      text += `- **${isId ? 'Cakupan Pekerjaan' : 'Scope of Work'}:\n`;
      group.tasks.forEach(t => {
        text += `  * Task: ${t.title}\n`;
        if (t.toolsRequired?.length) text += `    Tools: [${t.toolsRequired.join(', ')}]\n`;
      });
      text += `\n`;
    });

    text += `## ${isId ? 'Alur Kerja Eksekusi & Pipa Sekuensial' : 'Execution Workflow & Sequence Pipeline'}\n`;
    const sortedTasks = [...appData.generatedTasks].sort((a, b) => (a.executionOrder || 0) - (b.executionOrder || 0));
    sortedTasks.forEach((t, i) => {
      text += `${i + 1}. **[${t.agentRole || 'Generalist'}]** ➔ \`${t.title}\`\n`;
      if (t.dependencies?.length) text += `   *${isId ? 'Menunggu' : 'Waiting on'}: ${t.dependencies.join(', ')}*\n`;
    });

    return text;
  }, [appData, agentRoleGroups, language]);

  // 3. Individual Agent Prompt Generator
  const currentAgentPrompt = useMemo(() => {
    if (!selectedAgentRole || !agentRoleGroups[selectedAgentRole]) return '';
    const group = agentRoleGroups[selectedAgentRole];
    const isId = language === 'id';

    if (isId) {
      let prompt = `Anda bertindak sebagai [${group.role}] untuk proyek: "${appData.idea.name || 'App Wireframer Proyek'}".\n\n`;
      prompt += `### Peran & Keahlian Anda:\n${group.persona || 'Spesialis domain teknis yang bertanggung jawab atas penyelesaian tugas berkualitas tinggi.'}\n\n`;
      prompt += `### Konteks Aplikasi:\n${appData.generatedSpecify.overview}\n\n`;
      prompt += `### Tugas yang Ditugaskan untuk Anda Selesaikan:\n`;
      group.tasks.forEach((t, i) => {
        prompt += `#### ${i + 1}. ${t.title} (Urutan #${t.executionOrder})\n`;
        prompt += `Kriteria Penerimaan:\n`;
        t.criteria.forEach(c => {
          prompt += `- ${c}\n`;
        });
        if (t.toolsRequired?.length) prompt += `Alat yang Diperlukan: ${t.toolsRequired.join(', ')}\n`;
        prompt += `\n`;
      });
      prompt += `### Petunjuk Eksekusi:\n`;
      prompt += `Harap fokus secara khusus pada tanggung jawab ini. Tuliskan kode atau konfigurasi yang presisi, modular, dan bersih untuk bagian Anda.`;
      return prompt;
    }

    let prompt = `You are acting as the [${group.role}] for the project: "${appData.idea.name || 'App'}".\n\n`;
    prompt += `### Your Persona & Expertise:\n${group.persona || 'Technical domain specialist responsible for high-quality execution.'}\n\n`;
    prompt += `### Overall App Context:\n${appData.generatedSpecify.overview}\n\n`;
    prompt += `### Assigned Tasks for Your Role:\n`;
    group.tasks.forEach((t, i) => {
      prompt += `#### ${i + 1}. ${t.title} (Order #${t.executionOrder})\n`;
      prompt += `Acceptance Criteria:\n`;
      t.criteria.forEach(c => {
        prompt += `- ${c}\n`;
      });
      if (t.toolsRequired?.length) prompt += `Required Tools: ${t.toolsRequired.join(', ')}\n`;
      prompt += `\n`;
    });
    prompt += `### Instructions:\n`;
    prompt += `Please focus specifically on these responsibilities. Output modular, production-ready code or configurations for your domain.`;
    return prompt;
  }, [selectedAgentRole, agentRoleGroups, appData, language]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(`${label} ${t.implement.copiedAlert}`);
      setTimeout(() => setCopyStatus(''), 3000);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl text-[#333333] tracking-wider">{t.implement.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {t.implement.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#EAE3C9]/70 p-1 rounded-full border border-[#D1CBB8] text-xs font-bold self-stretch md:self-auto justify-between flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('master')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'master' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <Icon name="spark" className="h-3.5 w-3.5" />
            <span>{t.implement.tabMaster}</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'agents' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <Icon name="bot" className="h-3.5 w-3.5" />
            <span>{t.implement.tabAgentPrompts}</span>
          </button>

          <button
            onClick={() => setActiveTab('orchestrator')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'orchestrator' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <Icon name="history" className="h-3.5 w-3.5" />
            <span>{t.implement.tabOrchestrator}</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'markdown' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <Icon name="doc" className="h-3.5 w-3.5" />
            <span>{t.implement.tabMarkdown}</span>
          </button>
        </div>
      </div>

      {copyStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
          <span>✅</span>
          <span>{copyStatus}</span>
        </div>
      )}

      {/* TAB 1: MASTER PROMPT (SOLO DEV) */}
      {activeTab === 'master' && (
        <div className="bg-white/90 rounded-2xl border border-[#EAE3C9] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#EAE3C9]">
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span>⚡</span> {t.implement.masterTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.implement.masterSubtitle}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(masterAiPrompt, 'Master Prompt')}
              className="px-4 py-2 bg-[#00A99D] text-white rounded-lg font-bold text-xs hover:bg-[#007c73] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Icon name="copy" className="h-4 w-4" />
              {t.implement.copyMasterBtn}
            </button>
          </div>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[55vh] whitespace-pre-wrap leading-relaxed">
            {masterAiPrompt}
          </pre>
        </div>
      )}

      {/* TAB 2: AGENT SQUAD PROMPTS */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Agent Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-1">
              {t.implement.selectRoleHeader} ({uniqueAgentRoles.length})
            </h4>
            <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
              {uniqueAgentRoles.map(role => {
                const config = getAgentConfig(role);
                const isSelected = selectedAgentRole === role;
                const taskCount = agentRoleGroups[role]?.tasks.length || 0;

                return (
                  <button
                    key={role}
                    onClick={() => setSelectedAgentRole(role)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? `${config.bg} ${config.border} ring-2 ring-[#00A99D] shadow-xs`
                        : 'bg-white/80 border-[#EAE3C9] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{config.avatarIcon}</span>
                      <div>
                        <p className={`font-bold text-xs ${config.color}`}>{role}</p>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{agentRoleGroups[role]?.persona}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-white/90 px-2 py-0.5 rounded-full border border-gray-200">
                      {taskCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Output for Selected Agent */}
          <div className="lg:col-span-8 bg-white/90 rounded-2xl border border-[#EAE3C9] p-5 shadow-xs flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <span>🤖</span> Prompt for: <span className="text-[#00A99D]">{selectedAgentRole}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t.implement.agentPromptDesc}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(currentAgentPrompt, `[${selectedAgentRole}] Prompt`)}
                className="px-3.5 py-1.5 bg-[#00A99D] text-white rounded-lg font-bold text-xs hover:bg-[#007c73] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Icon name="copy" className="h-3.5 w-3.5" />
                {t.implement.copyRolePromptBtn}
              </button>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[50vh] whitespace-pre-wrap leading-relaxed">
              {currentAgentPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: ORCHESTRATOR BLUEPRINT */}
      {activeTab === 'orchestrator' && (
        <div className="bg-white/90 rounded-2xl border border-[#EAE3C9] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#EAE3C9]">
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span>🧭</span> {t.implement.orchTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.implement.orchSubtitle}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(orchestratorPrompt, 'Orchestrator Blueprint')}
              className="px-4 py-2 bg-[#00A99D] text-white rounded-lg font-bold text-xs hover:bg-[#007c73] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Icon name="copy" className="h-4 w-4" />
              {t.implement.copyOrchBtn}
            </button>
          </div>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[55vh] whitespace-pre-wrap leading-relaxed">
            {orchestratorPrompt}
          </pre>
        </div>
      )}

      {/* TAB 4: COMPLETE MARKDOWN SPEC */}
      {activeTab === 'markdown' && (
        <div className="bg-white/90 rounded-2xl border border-[#EAE3C9] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#EAE3C9]">
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span>📄</span> {t.implement.markdownTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.implement.markdownSubtitle}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(fullSpecMarkdown, 'Full Markdown Spec')}
              className="px-4 py-2 bg-[#00A99D] text-white rounded-lg font-bold text-xs hover:bg-[#007c73] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Icon name="copy" className="h-4 w-4" />
              {t.implement.copyMarkdownBtn}
            </button>
          </div>

          <div className="bg-[#FDFCEC]/70 p-5 rounded-xl border border-[#EAE3C9] max-h-[55vh] overflow-y-auto">
            <MarkdownRenderer markdown={fullSpecMarkdown} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImplementStage;
