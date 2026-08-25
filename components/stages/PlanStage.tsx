import React, { useState } from 'react';
import { AppData, WireframeScreen, UserFlowStep } from '../../types';
import Card from '../Card';
import Button from '../Button';
import { COMMON_FEATURES } from '../../constants';
import { generatePlanContent } from '../../services/geminiService';
import { Icon } from '../Icon';
import MarkdownRenderer from '../MarkdownRenderer';
import { WireframeCanvas } from '../WireframeCanvas';
import { useLanguage } from '../../services/i18n';

interface PlanStageProps {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
}

type PlanViewMode = 'wireframe' | 'specs' | 'all';

const PlanStage: React.FC<PlanStageProps> = ({ appData, setAppData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [activePlanTab, setActivePlanTab] = useState<PlanViewMode>('wireframe');
  const { language, t } = useLanguage();

  const handleFeatureToggle = (feature: string) => {
    setAppData(prev => {
      const newFeatures = prev.plan.features.includes(feature)
        ? prev.plan.features.filter(f => f !== feature)
        : [...prev.plan.features, feature];
      return { ...prev, plan: { ...prev.plan, features: newFeatures } };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppData(prev => ({ ...prev, plan: { ...prev.plan, [name]: value } }));
  };

  const handleNfrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppData(prev => ({
      ...prev,
      plan: {
        ...prev.plan,
        nfrs: {
          ...prev.plan.nfrs,
          [name]: value,
        },
      },
    }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppData(prev => ({...prev, plan: {...prev.plan, isOffline: e.target.value === 'true'}}));
  };
  
  const canGenerate = appData.plan.features.length > 0 && appData.plan.homeScreen;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await generatePlanContent(appData.plan, appData.generatedSpecify.requirements, language);
      setAppData(prev => ({ ...prev, generatedPlan: result }));
      setActivePlanTab('wireframe');
    } catch (e: any) {
      if (e?.message === 'API_KEY_MISSING') {
        setError(t.specify.apiKeyMissing);
      } else {
        setError(e?.message || (language === 'id' ? 'Gagal menghasilkan rencana. Silakan coba lagi.' : 'Failed to generate plan. Please try again.'));
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratedDataChange = (field: keyof AppData['generatedPlan'], value: any) => {
    setAppData(prev => ({
      ...prev,
      generatedPlan: {
        ...prev.generatedPlan,
        [field]: value
      }
    }));
  };

  const handleUpdateScreens = (newScreens: WireframeScreen[]) => {
    handleGeneratedDataChange('wireframes', newScreens);
  };

  const handleUpdateUserFlow = (newFlow: UserFlowStep[]) => {
    handleGeneratedDataChange('userFlow', newFlow);
  };

  const hasGeneratedPlan = Boolean(appData.generatedPlan.dataModels || (appData.generatedPlan.wireframes && appData.generatedPlan.wireframes.length > 0));

  // Features list display with bilingual interpretation
  const featuresList = language === 'id' ? t.commonFeaturesList : COMMON_FEATURES;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl text-[#333333] tracking-wider">{t.plan.title}</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {t.plan.subtitle}
          </p>
        </div>

        {hasGeneratedPlan && (
          <div className="flex bg-[#EAE3C9]/70 p-1 rounded-full border border-[#D1CBB8] text-xs font-bold self-stretch sm:self-auto justify-between gap-1">
            <button
              onClick={() => setActivePlanTab('wireframe')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activePlanTab === 'wireframe' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
              }`}
            >
              <span>📐</span>
              <span>{t.plan.tabWireframe}</span>
            </button>
            <button
              onClick={() => setActivePlanTab('specs')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activePlanTab === 'specs' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
              }`}
            >
              <span>🗄️</span>
              <span>{t.plan.tabSpecs}</span>
            </button>
            <button
              onClick={() => setActivePlanTab('all')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activePlanTab === 'all' ? 'bg-[#00A99D] text-white shadow-xs' : 'text-gray-700 hover:text-black'
              }`}
            >
              <span>⚡</span>
              <span>{t.plan.tabAll}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column */}
        <div className={`${hasGeneratedPlan && activePlanTab === 'wireframe' ? 'lg:col-span-4' : 'lg:col-span-5'} flex flex-col gap-5`}>
          <Card title={t.plan.commonFeaturesTitle} className="bg-[#FDFCEC]/50 max-h-56 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {COMMON_FEATURES.map((canonicalFeature, idx) => {
                const displayLabel = featuresList[idx] || canonicalFeature;
                const isSelected = appData.plan.features.includes(canonicalFeature) || (language === 'id' && appData.plan.features.includes(displayLabel));
                return (
                  <label key={canonicalFeature} className="flex items-center gap-2 cursor-pointer p-1.5 rounded-md hover:bg-[#EAE3C9]/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFeatureToggle(canonicalFeature)}
                      className="h-4 w-4 rounded bg-white border-gray-300 text-[#00A99D] focus:ring-[#00A99D]/50"
                    />
                    <span className="text-xs text-gray-700">{displayLabel}</span>
                  </label>
                );
              })}
            </div>
          </Card>

          <Card title={t.plan.offlineModeTitle} className="bg-[#FDFCEC]/50">
            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="offlineMode" value="false" checked={!appData.plan.isOffline} onChange={handleRadioChange} className="text-[#00A99D] focus:ring-[#00A99D]/50"/>
                <span>{t.plan.onlineOnly}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="offlineMode" value="true" checked={appData.plan.isOffline} onChange={handleRadioChange} className="text-[#00A99D] focus:ring-[#00A99D]/50"/>
                <span>{t.plan.offlineSupport}</span>
              </label>
            </div>
          </Card>

          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-sm text-[#333333]">{t.plan.homeScreenLabel}</span>
            <textarea 
              name="homeScreen" 
              value={appData.plan.homeScreen} 
              onChange={handleInputChange} 
              rows={3} 
              className="bg-white/80 p-2.5 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition text-xs" 
              placeholder={t.plan.homeScreenPlaceholder} 
            />
          </label>

          <Card title={t.plan.nfrTitle} className="bg-[#FDFCEC]/50">
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-gray-600">{t.plan.securityLabel}</span>
                <input name="security" value={appData.plan.nfrs.security} onChange={handleNfrChange} className="bg-white/80 p-1.5 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition text-xs" placeholder={t.plan.securityPlaceholder} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-gray-600">{t.plan.performanceLabel}</span>
                <input name="performance" value={appData.plan.nfrs.performance} onChange={handleNfrChange} className="bg-white/80 p-1.5 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition text-xs" placeholder={t.plan.performancePlaceholder} />
              </label>
            </div>
          </Card>

          <Button onClick={handleGenerate} isLoading={isLoading} disabled={!canGenerate}>
            {hasGeneratedPlan ? t.plan.regenerateBtn : t.plan.generateBtn}
          </Button>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Right Output Column */}
        <div className={`${hasGeneratedPlan && activePlanTab === 'wireframe' ? 'lg:col-span-8' : 'lg:col-span-7'} flex flex-col gap-5`}>
          
          {/* TAB 1: VISUAL WIREFRAMES & USER FLOW */}
          {(activePlanTab === 'wireframe' || activePlanTab === 'all') && (
            <div className="bg-white/50 p-4 rounded-xl border border-[#EAE3C9]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EAE3C9]">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <span>📐</span> {t.plan.wireframeTitle}
                </h3>
                <span className="text-xs text-[#00A99D] font-semibold">{t.plan.wireframeSubtitle}</span>
              </div>

              {appData.generatedPlan.wireframes && appData.generatedPlan.wireframes.length > 0 ? (
                <WireframeCanvas
                  screens={appData.generatedPlan.wireframes}
                  userFlow={appData.generatedPlan.userFlow}
                  onUpdateScreens={handleUpdateScreens}
                  onUpdateUserFlow={handleUpdateUserFlow}
                />
              ) : (
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-white/60 rounded-lg border border-dashed border-gray-300">
                  <span className="text-3xl mb-2">📱</span>
                  <p className="text-sm font-semibold text-gray-700">{t.plan.noWireframeTitle}</p>
                  <p className="text-xs text-gray-500 max-w-sm mt-1">
                    {t.plan.noWireframeDesc}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS & DATA MODELS */}
          {(activePlanTab === 'specs' || activePlanTab === 'all') && (
            <div className="flex flex-col gap-5">
              <Card 
                title={t.plan.dataModelsTitle}
                actions={
                  <button 
                    onClick={() => setEditingField(editingField === 'dataModels' ? null : 'dataModels')} 
                    className="text-gray-400 hover:text-[#00A99D] transition-colors"
                    aria-label={editingField === 'dataModels' ? t.finishEdit : t.edit}
                  >
                    <Icon name={editingField === 'dataModels' ? 'check' : 'edit'} className="h-5 w-5" />
                  </button>
                }
              >
                {editingField === 'dataModels' ? (
                  <textarea
                    value={appData.generatedPlan.dataModels}
                    onChange={(e) => handleGeneratedDataChange('dataModels', e.target.value)}
                    rows={8}
                    className="w-full bg-white/80 p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition font-mono text-xs"
                  />
                ) : (
                  <MarkdownRenderer markdown={appData.generatedPlan.dataModels || t.plan.dataModelsPlaceholder} />
                )}
              </Card>

              <Card 
                title={t.plan.apiNeedsTitle}
                actions={
                  <button 
                    onClick={() => setEditingField(editingField === 'apiNeeds' ? null : 'apiNeeds')} 
                    className="text-gray-400 hover:text-[#00A99D] transition-colors"
                    aria-label={editingField === 'apiNeeds' ? t.finishEdit : t.edit}
                  >
                    <Icon name={editingField === 'apiNeeds' ? 'check' : 'edit'} className="h-5 w-5" />
                  </button>
                }
              >
                {editingField === 'apiNeeds' ? (
                  <textarea
                    value={appData.generatedPlan.apiNeeds}
                    onChange={(e) => handleGeneratedDataChange('apiNeeds', e.target.value)}
                    rows={4}
                    className="w-full bg-white/80 p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition text-xs"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-wrap text-sm">{appData.generatedPlan.apiNeeds || t.plan.apiNeedsPlaceholder}</p>
                )}
              </Card>

              <Card 
                title={t.plan.uiUxNotesTitle}
                actions={
                  <button 
                    onClick={() => setEditingField(editingField === 'uiUxNotes' ? null : 'uiUxNotes')} 
                    className="text-gray-400 hover:text-[#00A99D] transition-colors"
                    aria-label={editingField === 'uiUxNotes' ? t.finishEdit : t.edit}
                  >
                    <Icon name={editingField === 'uiUxNotes' ? 'check' : 'edit'} className="h-5 w-5" />
                  </button>
                }
              >
                {editingField === 'uiUxNotes' ? (
                  <textarea
                    value={appData.generatedPlan.uiUxNotes}
                    onChange={(e) => handleGeneratedDataChange('uiUxNotes', e.target.value)}
                    rows={6}
                    className="w-full bg-white/80 p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/50 focus:border-[#00A99D] focus:outline-none transition text-xs"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-wrap text-sm">{appData.generatedPlan.uiUxNotes || t.plan.uiUxNotesPlaceholder}</p>
                )}
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PlanStage;
