import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { Loader } from './Loader';
import * as dbService from '../services/dbService';
import { ProjectMeta } from '../services/dbService';
import { useLanguage } from '../services/i18n';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject: (id: number) => void;
  onCreateNewProject: (useSampleData?: boolean) => void;
  currentProjectId: number | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onLoadProject, onCreateNewProject, currentProjectId }) => {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const fetchedProjects = await dbService.getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  const handleDelete = async (id: number) => {
    const confirmMsg = language === 'id' 
      ? 'Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.'
      : 'Are you sure you want to delete this project? This cannot be undone.';
      
    if (window.confirm(confirmMsg)) {
      await dbService.deleteProject(id);
      if (id === currentProjectId) {
         window.location.reload();
      } else {
         fetchProjects();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#FDFCEC] rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-[#EAE3C9]" onClick={e => e.stopPropagation()}>
        <header className="p-4 sm:p-5 border-b border-[#EAE3C9] flex justify-between items-center bg-[#F7F4EA]/80 rounded-t-xl">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-6 w-6 text-[#00A99D]" />
            <h2 className="text-2xl font-bold text-[#333333] tracking-tight">{t.projectModal.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-[#EAE3C9]/50 transition-colors">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </header>

        <div className="p-5 sm:p-6 flex-grow overflow-y-auto">
          {/* Action buttons for creating new project */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => onCreateNewProject(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#00A99D] hover:bg-[#007c73] text-white rounded-lg transition-colors font-semibold shadow-xs text-sm cursor-pointer"
            >
              <Icon name="add" className="h-4 w-4" />
              {t.projectModal.createBlankBtn}
            </button>
            <button
              onClick={() => onCreateNewProject(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#F7F4EA] text-[#333333] border border-[#00A99D]/40 rounded-lg transition-colors font-semibold shadow-xs text-sm cursor-pointer"
            >
              <Icon name="sparkles" className="h-4 w-4 text-[#FF7A59]" />
              {t.projectModal.createSampleBtn}
            </button>
          </div>
          
          <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">{t.projectModal.savedProjects}</h3>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="h-10 w-10 border-4 !border-[#00A99D] border-b-transparent" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-500 py-12 bg-white/40 rounded-lg border border-dashed border-[#EAE3C9]">
              <p className="text-sm">{t.projectModal.noProjects}</p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {projects.map(project => (
                <li key={project.id} className={`p-3.5 rounded-lg flex items-center justify-between transition-colors border ${currentProjectId === project.id ? 'bg-[#EAE3C9] border-[#D1CBB8]' : 'bg-white/80 hover:bg-[#EAE3C9]/40 border-[#EAE3C9]'}`}>
                  <div className="pr-4">
                    <p className="font-bold text-sm text-[#333333]">{project.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.projectModal.lastModified}: {new Date(project.lastModified).toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onLoadProject(project.id)}
                      disabled={currentProjectId === project.id}
                      className="px-3.5 py-1.5 bg-[#F45D48] text-white rounded-full hover:bg-[#e14a35] disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-xs font-bold uppercase cursor-pointer"
                    >
                      {currentProjectId === project.id ? t.projectModal.loaded : t.projectModal.load}
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label={`Delete project ${project.name}`}
                    >
                      <Icon name="delete" className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
