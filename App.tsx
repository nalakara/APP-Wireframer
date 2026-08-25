import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AppData, Stage } from './types';
import ProgressBar from './components/ProgressBar';
import SpecifyStage from './components/stages/SpecifyStage';
import PlanStage from './components/stages/PlanStage';
import TaskStage from './components/stages/TaskStage';
import ImplementStage from './components/stages/ImplementStage';
import { Icon } from './components/Icon';
import { getSampleAppData, getEmptyAppData } from './sampleData';
import * as dbService from './services/dbService';
import ProjectModal from './components/ProjectModal';
import { Loader } from './components/Loader';
import { useLanguage } from './services/i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const LAST_PROJECT_ID_KEY = 'app-wireframer-last-project-id';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.Specify);
  const [appData, setAppData] = useState<AppData | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const { language, t } = useLanguage();

  // Stages mapped dynamically with current language translation
  const localizedStages = useMemo(() => [
    { id: Stage.Specify, name: t.stages.specify.name, description: t.stages.specify.description },
    { id: Stage.Plan, name: t.stages.plan.name, description: t.stages.plan.description },
    { id: Stage.Task, name: t.stages.task.name, description: t.stages.task.description },
    { id: Stage.Implement, name: t.stages.implement.name, description: t.stages.implement.description },
  ], [t]);

  // Initialization: Load last project from DB or create a new one
  useEffect(() => {
    async function initialize() {
      await dbService.initDB();
      const lastIdStr = localStorage.getItem(LAST_PROJECT_ID_KEY);
      const lastId = lastIdStr ? parseInt(lastIdStr, 10) : null;

      if (lastId) {
        const data = await dbService.getProject(lastId);
        if (data) {
          setAppData(data);
          setCurrentProjectId(lastId);
        } else {
          // Last project was deleted, find another one or create new
          const allProjects = await dbService.getAllProjects();
          if (allProjects.length > 0) {
            await handleLoadProject(allProjects[0].id, false);
          } else {
            await handleCreateNewProject(true);
          }
        }
      } else {
        // No last project, create one from sample data in current language
        await handleCreateNewProject(true);
      }
      setIsDbLoading(false);
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save on data change with debouncing
  useEffect(() => {
    if (currentProjectId && appData && !isDbLoading) {
      const handler = setTimeout(() => {
        dbService.updateProject(currentProjectId, appData);
        localStorage.setItem(LAST_PROJECT_ID_KEY, currentProjectId.toString());
      }, 1000);

      return () => clearTimeout(handler);
    }
  }, [appData, currentProjectId, isDbLoading]);

  // Automatically scroll to top whenever stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentStage]);

  const handleNext = () => {
    if (currentStage < Stage.Implement) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleBack = () => {
    if (currentStage > Stage.Specify) {
      setCurrentStage(currentStage - 1);
    }
  };
  
  const handleCreateNewProject = async (useSampleData = false) => {
    const templateSource = useSampleData ? getSampleAppData(language) : getEmptyAppData(language);
    // Create a deep copy to avoid mutation
    const newData: AppData = JSON.parse(JSON.stringify(templateSource));

    // Append timestamp to project name
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (useSampleData) {
      newData.idea.name = `${templateSource.idea.name} (${timestamp})`;
    } else {
      newData.idea.name = `${t.projectModal.newProjectDefault} (${timestamp})`;
    }

    const newId = await dbService.addProject(newData);
    setAppData(newData);
    setCurrentProjectId(newId);
    setCurrentStage(Stage.Specify);
    setIsProjectsModalOpen(false);
  };

  const handleLoadProject = async (id: number, closeModal = true) => {
    const data = await dbService.getProject(id);
    if (data) {
      setAppData(data);
      setCurrentProjectId(id);
      setCurrentStage(Stage.Specify);
      if (closeModal) setIsProjectsModalOpen(false);
    }
  };

  const isNextDisabled = useMemo(() => {
    if (!appData) return true;
    switch (currentStage) {
      case Stage.Specify:
        return !appData.generatedSpecify.overview;
      case Stage.Plan:
        return !appData.generatedPlan.dataModels;
      case Stage.Task:
        return appData.generatedTasks.length === 0;
      default:
        return false;
    }
  }, [currentStage, appData]);

  const renderCurrentStage = useCallback(() => {
    if (!appData) return null;

    switch (currentStage) {
      case Stage.Specify:
        return <SpecifyStage appData={appData} setAppData={setAppData} />;
      case Stage.Plan:
        return <PlanStage appData={appData} setAppData={setAppData} />;
      case Stage.Task:
        return <TaskStage appData={appData} setAppData={setAppData} />;
      case Stage.Implement:
        return <ImplementStage appData={appData} />;
      default:
        return null;
    }
  }, [currentStage, appData]);

  if (isDbLoading || !appData) {
    return (
      <div className="min-h-screen bg-[#FDFCEC] flex flex-col items-center justify-center">
        <Loader className="h-16 w-16 border-4 !border-[#00A99D] border-b-transparent" />
        <p className="mt-4 text-lg text-gray-700">{t.loadingProjects}</p>
      </div>
    );
  }

  return (
    <>
      <ProjectModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        onCreateNewProject={handleCreateNewProject}
        onLoadProject={handleLoadProject}
        currentProjectId={currentProjectId}
      />
      <div className="min-h-screen bg-[#FDFCEC] text-[#333333] flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <header className="w-full max-w-5xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <Icon name="logo" className="h-10 w-10 text-[#00A99D]" />
              <h1 className="text-5xl sm:text-6xl text-[#333333] tracking-wider">
                {t.appTitle}
              </h1>
            </div>
            <p className="text-gray-500">
              {t.appSubtitle}{' '}
              <span className="font-bold text-gray-700 bg-white/60 px-2 py-0.5 rounded border border-[#EAE3C9]">
                {appData.idea.name || t.none}
              </span>
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-2 flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#EAE3C9] bg-white/70 text-gray-600 rounded-full hover:bg-[#EAE3C9] hover:text-[#333333] transition-colors text-sm font-medium shadow-xs cursor-pointer"
              aria-label={t.projectsBtn}
            >
              <Icon name="folder" className="h-4 w-4" />
              {t.projectsBtn}
            </button>
            <button
              onClick={() => handleCreateNewProject(false)}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#EAE3C9] bg-white/70 text-gray-600 rounded-full hover:bg-[#EAE3C9] hover:text-[#333333] transition-colors text-sm font-medium shadow-xs cursor-pointer"
              aria-label={t.newProjectBtn}
            >
              <Icon name="add" className="h-4 w-4" />
              {t.newProjectBtn}
            </button>
          </div>
        </header>

        <main className="w-full max-w-5xl flex-grow">
          <ProgressBar currentStage={currentStage} stages={localizedStages} />
          <div className="mt-8 bg-white/50 rounded-lg p-6 sm:p-8 border border-[#EAE3C9] min-h-[500px] shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
            {renderCurrentStage()}
          </div>
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStage === Stage.Specify}
              className="px-6 py-2 bg-transparent border-2 border-[#00A99D] text-[#00A99D] rounded-full hover:bg-[#00A99D] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent transition-all duration-300 flex items-center gap-2 uppercase text-xs font-bold tracking-wider cursor-pointer"
            >
              <Icon name="back" className="h-5 w-5" />
              {t.backBtn}
            </button>
            {currentStage !== Stage.Implement && (
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="px-6 py-2 bg-[#F45D48] text-white rounded-full hover:bg-[#e14a35] disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 uppercase text-xs font-bold tracking-wider shadow-md hover:shadow-lg disabled:shadow-none cursor-pointer"
              >
                {t.nextBtn}
                <Icon name="next" className="h-5 w-5" />
              </button>
            )}
          </div>
        </main>
        <footer className="w-full max-w-5xl text-center mt-8 text-gray-400 text-sm">
          <p>{t.builtWith}</p>
        </footer>
      </div>
    </>
  );
};

export default App;
