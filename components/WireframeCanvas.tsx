import React, { useState } from 'react';
import { WireframeScreen, WireframeElement, UserFlowStep } from '../types';
import { Icon } from './Icon';
import { useLanguage } from '../services/i18n';

interface WireframeCanvasProps {
  screens?: WireframeScreen[];
  userFlow?: UserFlowStep[];
  onUpdateScreens?: (screens: WireframeScreen[]) => void;
  onUpdateUserFlow?: (flow: UserFlowStep[]) => void;
}

const ELEMENT_TYPE_ICONS: Record<string, string> = {
  header: '📌',
  navbar: '🧭',
  hero: '⭐',
  card: '🃏',
  list: '📋',
  form: '📝',
  button: '🔘',
  search: '🔍',
  chart: '📊',
  tabs: '📑',
  sidebar: '📂',
  footer: '🦶',
  chat: '💬',
  custom: '🧩',
};

export const WireframeCanvas: React.FC<WireframeCanvasProps> = ({
  screens = [],
  userFlow = [],
  onUpdateScreens,
  onUpdateUserFlow,
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeViewTab, setActiveViewTab] = useState<'wireframe' | 'userflow'>('wireframe');
  const [isAddingElement, setIsAddingElement] = useState(false);
  const [newElementType, setNewElementType] = useState<WireframeElement['type']>('card');
  const [newElementLabel, setNewElementLabel] = useState('');
  const [newElementDesc, setNewElementDesc] = useState('');
  const { language, t } = useLanguage();

  const currentScreen = screens[activeScreenIndex] || screens[0];

  const handleSelectScreen = (idx: number) => {
    setActiveScreenIndex(idx);
    setSelectedElementId(null);
  };

  const handleAddElement = () => {
    if (!newElementLabel.trim() || !currentScreen || !onUpdateScreens) return;
    
    const newElem: WireframeElement = {
      id: `elem-${Date.now()}`,
      type: newElementType,
      label: newElementLabel.trim(),
      description: newElementDesc.trim() || undefined,
    };

    const updatedScreens = [...screens];
    updatedScreens[activeScreenIndex] = {
      ...currentScreen,
      elements: [...currentScreen.elements, newElem],
    };

    onUpdateScreens(updatedScreens);
    setNewElementLabel('');
    setNewElementDesc('');
    setIsAddingElement(false);
    setSelectedElementId(newElem.id);
  };

  const handleDeleteElement = (elemId: string) => {
    if (!currentScreen || !onUpdateScreens) return;
    const updatedScreens = [...screens];
    updatedScreens[activeScreenIndex] = {
      ...currentScreen,
      elements: currentScreen.elements.filter(e => e.id !== elemId),
    };
    onUpdateScreens(updatedScreens);
    if (selectedElementId === elemId) setSelectedElementId(null);
  };

  const selectedElement = currentScreen?.elements.find(e => e.id === selectedElementId);

  // Render individual wireframe element based on type
  const renderWireframeBlock = (elem: WireframeElement) => {
    const isSelected = selectedElementId === elem.id;

    const baseClasses = `relative rounded-lg p-2.5 transition-all cursor-pointer border ${
      isSelected 
        ? 'border-[#00A99D] ring-2 ring-[#00A99D]/40 bg-[#00A99D]/5 shadow-sm' 
        : 'border-dashed border-gray-300 hover:border-gray-400 bg-white/90'
    }`;

    switch (elem.type) {
      case 'header':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={`${baseClasses} bg-gray-50 border-solid border-gray-200 py-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-[#00A99D]/20 flex items-center justify-center text-[10px] font-bold text-[#007c73]">
                  LOGO
                </div>
                <span className="font-bold text-xs text-gray-800 tracking-wide">{elem.label}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">🔍</span>
                <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">🔔</span>
                <span className="h-5 w-5 rounded-full bg-[#00A99D] text-white flex items-center justify-center text-[10px] font-bold">U</span>
              </div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1 italic">{elem.description}</p>}
          </div>
        );

      case 'search':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex items-center gap-2 bg-gray-100/90 rounded-full px-3 py-1.5 border border-gray-200 text-xs text-gray-500">
              <span>🔍</span>
              <span className="flex-1 font-medium">{elem.label}</span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200">{language === 'id' ? 'Saring ⚙️' : 'Filter ⚙️'}</span>
            </div>
            {elem.description && <p className="text-[10px] text-gray-400 mt-1 pl-1">{elem.description}</p>}
          </div>
        );

      case 'hero':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={`${baseClasses} bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200`}>
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#00A99D] text-white px-2 py-0.5 rounded">
                {language === 'id' ? 'Unggulan' : 'Featured'}
              </span>
              <span className="text-xs text-teal-800 font-bold">⭐ {language === 'id' ? 'Aktif' : 'Active'}</span>
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">{elem.label}</h4>
            <p className="text-xs text-gray-600 mb-2.5 line-clamp-2">{elem.description || (language === 'id' ? 'Sorotan ringkasan atau metrik utama.' : 'Highlight key call-to-action or featured statistics.')}</p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-teal-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#00A99D] w-2/3 rounded-full"></div>
              </div>
              <span className="text-[10px] font-bold text-teal-800">65%</span>
            </div>
          </div>
        );

      case 'card':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex gap-3 items-center">
              <div className="h-12 w-12 rounded-lg bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                🖼️
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="font-bold text-xs text-gray-900 truncate">{elem.label}</h5>
                  <span className="text-[9px] bg-gray-100 text-gray-600 px-1 rounded">Card</span>
                </div>
                <div className="space-y-1 mt-1">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-2 border-t border-gray-100 pt-1 italic">{elem.description}</p>}
          </div>
        );

      case 'list':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                <span>📋</span> {elem.label}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">3 {language === 'id' ? 'item' : 'items'}</span>
            </div>
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 p-1.5 rounded border border-gray-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00A99D]"></span>
                    <span className="text-gray-700 text-[11px] font-medium">{language === 'id' ? 'Entri Item' : 'List Item'} #{i}</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">➔</span>
                </div>
              ))}
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1.5 italic">{elem.description}</p>}
          </div>
        );

      case 'form':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={`${baseClasses} bg-amber-50/40 border-amber-200`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1.5">
              📝 {elem.label}
            </span>
            <div className="space-y-1.5">
              <div className="bg-white rounded border border-gray-300 p-1.5 text-[11px] text-gray-400">
                {language === 'id' ? 'Kolom Input...' : 'Input field...'}
              </div>
              <div className="bg-white rounded border border-gray-300 p-1.5 text-[11px] text-gray-400">
                {language === 'id' ? 'Pilih opsi...' : 'Select option...'}
              </div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-600 mt-1.5 italic">{elem.description}</p>}
          </div>
        );

      case 'button':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className="w-full">
            <button className="w-full bg-[#00A99D] text-white py-2 px-3 rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 hover:bg-[#007c73] transition-colors">
              <span>🔘</span>
              <span>{elem.label}</span>
            </button>
            {elem.description && <p className="text-[10px] text-gray-500 text-center mt-1 italic">{elem.description}</p>}
          </div>
        );

      case 'chart':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-xs text-gray-800">📊 {elem.label}</span>
              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{language === 'id' ? 'Tren Mingguan' : 'Weekly Trend'}</span>
            </div>
            <div className="h-20 bg-gray-50 rounded border border-gray-200 flex items-end justify-between p-2 gap-1.5">
              <div className="bg-[#00A99D]/40 hover:bg-[#00A99D] transition-all rounded-t w-full h-[40%]"></div>
              <div className="bg-[#00A99D]/60 hover:bg-[#00A99D] transition-all rounded-t w-full h-[70%]"></div>
              <div className="bg-[#00A99D]/50 hover:bg-[#00A99D] transition-all rounded-t w-full h-[55%]"></div>
              <div className="bg-[#00A99D] rounded-t w-full h-[90%]"></div>
              <div className="bg-[#00A99D]/70 hover:bg-[#00A99D] transition-all rounded-t w-full h-[65%]"></div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1 italic">{elem.description}</p>}
          </div>
        );

      case 'tabs':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex bg-gray-100 p-1 rounded-md text-[11px] font-semibold text-center">
              <div className="flex-1 bg-white text-gray-900 rounded py-1 shadow-2xs">
                {elem.label || (language === 'id' ? 'Aktif' : 'Tab 1')}
              </div>
              <div className="flex-1 text-gray-500 py-1">{language === 'id' ? 'Riwayat' : 'Tab 2'}</div>
              <div className="flex-1 text-gray-500 py-1">{language === 'id' ? 'Pengaturan' : 'Tab 3'}</div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1 italic">{elem.description}</p>}
          </div>
        );

      case 'chat':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <span className="font-bold text-xs text-gray-800">💬 {elem.label}</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Online</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="bg-gray-100 p-2 rounded-xl rounded-bl-none text-gray-700 max-w-[80%]">
                {language === 'id' ? 'Halo! Ada yang bisa kami bantu hari ini?' : 'Hello! How can we assist you today?'}
              </div>
              <div className="bg-[#00A99D] text-white p-2 rounded-xl rounded-br-none max-w-[80%] ml-auto text-right">
                {language === 'id' ? 'Saya ingin mengecek status pesanan.' : 'I need help with my account setup.'}
              </div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1.5 italic">{elem.description}</p>}
          </div>
        );

      case 'navbar':
      case 'footer':
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={`${baseClasses} bg-gray-900 text-white py-2 border-solid border-gray-800`}>
            <div className="flex justify-around items-center text-xs">
              <div className="flex flex-col items-center gap-0.5 text-[#00A99D]">
                <span>🏠</span>
                <span className="text-[9px] font-bold">{language === 'id' ? 'Beranda' : 'Home'}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 text-gray-400">
                <span>🔍</span>
                <span className="text-[9px]">{language === 'id' ? 'Eksplor' : 'Explore'}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 text-gray-400">
                <span>🔔</span>
                <span className="text-[9px]">{language === 'id' ? 'Notif' : 'Alerts'}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 text-gray-400">
                <span>👤</span>
                <span className="text-[9px]">{language === 'id' ? 'Profil' : 'Profile'}</span>
              </div>
            </div>
            {elem.description && <p className="text-[10px] text-gray-400 text-center mt-1 italic">{elem.description}</p>}
          </div>
        );

      default:
        return (
          <div key={elem.id} onClick={() => setSelectedElementId(elem.id)} className={baseClasses}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-gray-800">🧩 {elem.label}</span>
              <span className="text-[9px] bg-gray-100 text-gray-500 px-1 rounded">{elem.type}</span>
            </div>
            {elem.description && <p className="text-[10px] text-gray-500 mt-1 italic">{elem.description}</p>}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Wireframe Canvas Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE3C9]">
        
        {/* Toggle between Wireframe Screens & User Flow */}
        <div className="flex items-center gap-1.5 bg-[#EAE3C9]/70 p-1 rounded-full text-xs font-bold">
          <button
            onClick={() => setActiveViewTab('wireframe')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
              activeViewTab === 'wireframe' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>📱</span>
            <span>{t.plan.wireframeTitle}</span>
          </button>
          <button
            onClick={() => setActiveViewTab('userflow')}
            className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
              activeViewTab === 'userflow' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
            }`}
          >
            <span>🗺️</span>
            <span>{t.plan.userFlowTitle}</span>
          </button>
        </div>

        {/* Device Viewport Toggle (Mobile vs Desktop) */}
        {activeViewTab === 'wireframe' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">{t.plan.screen}:</span>
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
              <button
                onClick={() => setDeviceType('mobile')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  deviceType === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                📱 {t.plan.deviceMobile}
              </button>
              <button
                onClick={() => setDeviceType('desktop')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  deviceType === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                💻 {t.plan.deviceDesktop}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: USER FLOW DIAGRAM */}
      {activeViewTab === 'userflow' && (
        <div className="bg-white/90 p-5 rounded-xl border border-[#EAE3C9] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <span>🗺️</span> {t.plan.userFlowTitle}
            </h3>
            <span className="text-xs text-gray-500 font-mono">{t.plan.userFlowSubtitle}</span>
          </div>

          {userFlow.length === 0 ? (
            <p className="text-gray-500 text-sm italic text-center py-8">{t.plan.noUserFlow}</p>
          ) : (
            <div className="space-y-4">
              {userFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  {idx < userFlow.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#00A99D]/30 -z-0"></div>
                  )}

                  <div className="h-8 w-8 rounded-full bg-[#00A99D] text-white flex items-center justify-center font-bold text-xs z-10 shadow-xs flex-shrink-0">
                    {step.step || idx + 1}
                  </div>

                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3.5 shadow-2xs hover:border-[#00A99D]/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        <span className="text-xs bg-[#EAE3C9] text-gray-700 px-2 py-0.5 rounded font-mono">{t.plan.screen}</span>
                        {step.screen}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 mt-2">
                      <div className="bg-white p-2 rounded border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">{t.plan.userAction}</span>
                        <span className="text-gray-800">{step.action}</span>
                      </div>
                      <div className="bg-teal-50/50 p-2 rounded border border-teal-100">
                        <span className="text-[10px] font-bold text-teal-700 uppercase block">{t.plan.systemOutcome}</span>
                        <span className="text-teal-900 font-medium">{step.outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: WIREFRAME SCREEN VIEWER */}
      {activeViewTab === 'wireframe' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visual Device Frame */}
          <div className="lg:col-span-2 flex flex-col items-center">
            
            {/* Screen Tabs Bar */}
            <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 mb-3">
              {screens.map((screen, idx) => (
                <button
                  key={screen.id || idx}
                  onClick={() => handleSelectScreen(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 border ${
                    activeScreenIndex === idx
                      ? 'bg-[#333333] text-white border-[#333333] shadow-xs'
                      : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>📺</span>
                  <span>{screen.name}</span>
                </button>
              ))}
            </div>

            {/* Simulated Device Chassis */}
            <div
              className={`transition-all duration-300 bg-gray-900 p-3 rounded-[32px] shadow-2xl border-4 border-gray-700 w-full flex flex-col ${
                deviceType === 'mobile' ? 'max-w-[340px]' : 'max-w-[620px]'
              }`}
            >
              {/* Device Header Bar */}
              <div className="flex items-center justify-between text-gray-400 text-[10px] px-3 pb-2 pt-1 font-mono">
                <span>9:41</span>
                <div className="h-3 w-16 bg-gray-800 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Screen Glass Canvas */}
              <div className="bg-[#FAF9F5] rounded-[22px] p-3 flex flex-col gap-2.5 min-h-[480px] max-h-[560px] overflow-y-auto border border-gray-200 shadow-inner">
                {currentScreen ? (
                  <>
                    <div className="text-center pb-2 border-b border-gray-200">
                      <h4 className="font-extrabold text-sm text-gray-900">{currentScreen.name}</h4>
                      <p className="text-[10px] text-gray-500 italic mt-0.5">{currentScreen.purpose}</p>
                    </div>

                    <div className="space-y-2.5">
                      {currentScreen.elements.map((elem) => (
                        <div key={elem.id} className="relative group">
                          {renderWireframeBlock(elem)}
                          
                          {/* Element Delete Action */}
                          {onUpdateScreens && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteElement(elem.id);
                              }}
                              className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-all text-xs z-20 shadow-xs"
                              title={t.plan.deleteElemTooltip}
                            >
                              <Icon name="delete" className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                    {t.plan.noWireframeTitle}
                  </div>
                )}
              </div>

              {/* Device Home Indicator */}
              <div className="w-24 h-1 bg-gray-700 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

          {/* Right Sidebar: Component Inspector & Manual Element Editor */}
          <div className="flex flex-col gap-4">
            
            {/* Inspector Box */}
            <div className="bg-white/90 p-4 rounded-xl border border-[#EAE3C9] shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <span>🔍</span> {t.plan.inspectorTitle}
                </h4>
                {selectedElement && (
                  <span className="text-[10px] bg-[#00A99D]/10 text-[#00A99D] font-mono px-2 py-0.5 rounded font-bold">
                    {selectedElement.type}
                  </span>
                )}
              </div>

              {selectedElement ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{t.plan.componentType}</span>
                    <p className="font-semibold text-gray-800 capitalize mt-0.5">
                      {ELEMENT_TYPE_ICONS[selectedElement.type] || '🧩'} {selectedElement.type}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{t.plan.componentLabel}</span>
                    <p className="font-semibold text-gray-900 mt-0.5">{selectedElement.label}</p>
                  </div>

                  {selectedElement.description && (
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{t.plan.specNotes}</span>
                      <p className="text-gray-700 bg-gray-50 p-2 rounded border border-gray-200 mt-0.5 leading-relaxed">
                        {selectedElement.description}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span>ID: <code className="font-mono text-gray-600">{selectedElement.id}</code></span>
                    <button 
                      onClick={() => setSelectedElementId(null)} 
                      className="text-[#00A99D] hover:underline font-bold"
                    >
                      {t.plan.deselect}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-xs leading-relaxed py-2 text-center italic">
                  {t.plan.inspectorEmpty}
                </p>
              )}
            </div>

            {/* Quick Add Element Card */}
            {onUpdateScreens && (
              <div className="bg-white/90 p-4 rounded-xl border border-[#EAE3C9] shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <span>➕</span> {t.plan.addComponentTitle}
                  </h4>
                  <button
                    onClick={() => setIsAddingElement(!isAddingElement)}
                    className="text-xs font-bold text-[#00A99D] hover:underline"
                  >
                    {isAddingElement ? t.cancel : t.open}
                  </button>
                </div>

                {isAddingElement ? (
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t.plan.componentType}</label>
                      <select
                        value={newElementType}
                        onChange={(e) => setNewElementType(e.target.value as any)}
                        className="w-full bg-white p-1.5 rounded border border-gray-300 text-xs"
                      >
                        {Object.entries(ELEMENT_TYPE_ICONS).map(([type, icon]) => (
                          <option key={type} value={type}>
                            {icon} {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t.plan.componentLabel}</label>
                      <input
                        value={newElementLabel}
                        onChange={(e) => setNewElementLabel(e.target.value)}
                        placeholder={t.plan.elementLabelPlaceholder}
                        className="w-full bg-white p-1.5 rounded border border-gray-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t.plan.specNotes}</label>
                      <textarea
                        value={newElementDesc}
                        onChange={(e) => setNewElementDesc(e.target.value)}
                        placeholder={t.plan.elementDescPlaceholder}
                        rows={2}
                        className="w-full bg-white p-1.5 rounded border border-gray-300 text-xs"
                      />
                    </div>

                    <button
                      onClick={handleAddElement}
                      disabled={!newElementLabel.trim()}
                      className="w-full bg-[#00A99D] text-white py-1.5 rounded-lg font-bold text-xs hover:bg-[#007c73] transition-colors disabled:opacity-50"
                    >
                      {t.plan.addComponentBtn}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingElement(true)}
                    className="w-full py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:border-[#00A99D] hover:text-[#00A99D] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Icon name="add" className="h-3.5 w-3.5" />
                    {t.plan.openBuilderBtn}
                  </button>
                )}
              </div>
            )}

            {/* Wireframing Info Box */}
            <div className="bg-teal-50/70 border border-teal-200 p-3 rounded-xl text-xs text-teal-900">
              <h5 className="font-bold mb-1 flex items-center gap-1">
                <span>📐</span> {t.plan.wireframeTipTitle}
              </h5>
              <p className="text-[11px] leading-relaxed">
                {t.plan.wireframeTipDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
