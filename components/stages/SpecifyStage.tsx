import React, { useState } from 'react';
import { AppData } from '../../types';
import Card from '../Card';
import Button from '../Button';
import { generateSpecifyContent, translateProjectContent } from '../../services/geminiService';
import { Icon } from '../Icon';
import { useLanguage } from '../../services/i18n';
import { getSampleAppData, getEmptyAppData } from '../../sampleData';

interface SpecifyStageProps {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
}

const SpecifyStage: React.FC<SpecifyStageProps> = ({ appData, setAppData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppData(prev => ({ ...prev, idea: { ...prev.idea, [name]: value } }));
  };

  const handleLocalizationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppData(prev => ({ ...prev, localization: { ...prev.localization, [name]: value } }));
  };
  
  const canGenerate = appData.idea.name && appData.idea.about && appData.idea.audience && appData.idea.problem;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setIsLoading(true);
    setError(null);
    setFeedbackMsg(null);
    try {
      const result = await generateSpecifyContent(appData.idea, appData.localization, language);
      setAppData(prev => ({ ...prev, generatedSpecify: result }));
      setFeedbackMsg({
        text: language === 'id' ? 'Spesifikasi AI berhasil dibuat dalam Bahasa Indonesia!' : 'AI Specification generated successfully!',
        type: 'success'
      });
    } catch (e: any) {
      if (e?.message === 'API_KEY_MISSING') {
        setError(t.specify.apiKeyMissing);
      } else {
        setError(e?.message || (language === 'id' ? 'Gagal menghasilkan spesifikasi. Silakan coba lagi.' : 'Failed to generate content. Please try again.'));
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = () => {
    const sample = getSampleAppData(language);
    setAppData(JSON.parse(JSON.stringify(sample)));
    setFeedbackMsg({
      text: language === 'id' ? 'Contoh ide dan template aplikasi Bahasa Indonesia berhasil dimuat!' : 'English sample template loaded successfully!',
      type: 'info'
    });
  };

  const handleClearForm = () => {
    const empty = getEmptyAppData(language);
    setAppData(JSON.parse(JSON.stringify(empty)));
    setFeedbackMsg({
      text: language === 'id' ? 'Formulir ide berhasil dikosongkan.' : 'Form cleared successfully.',
      type: 'info'
    });
  };

  const handleTranslateProject = async () => {
    setIsTranslating(true);
    setError(null);
    setFeedbackMsg(null);
    try {
      const translated = await translateProjectContent(appData, language);
      setAppData(translated);
      setFeedbackMsg({
        text: t.specify.translateSuccess,
        type: 'success'
      });
    } catch (e: any) {
      if (e?.message === 'API_KEY_MISSING') {
        setError(t.specify.apiKeyMissing);
      } else {
        setError(e?.message || (language === 'id' ? 'Gagal menerjemahkan proyek. Silakan coba lagi.' : 'Failed to translate project. Please try again.'));
      }
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleAddUserStory = () => {
    const defaultStory = language === 'id' ? 'Sebagai pengguna, saya ingin...' : 'As a user, I want to...';
    const newStories = [...appData.generatedSpecify.userStories, defaultStory];
    setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, userStories: newStories}}));
  };
  
  const handleAddRequirement = () => {
    const defaultReq = language === 'id' ? 'Kebutuhan fungsional baru...' : 'New requirement...';
    const newReqs = [...appData.generatedSpecify.requirements, defaultReq];
    setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, requirements: newReqs}}));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Action Bar for Language Templates & AI Translation */}
      <div className="bg-gradient-to-r from-[#F7F4EA] to-[#EAE3C9]/60 border border-[#EAE3C9] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-[#333333]">
          <span className="font-semibold flex items-center gap-1.5 text-[#00A99D]">
            <Icon name="lightning" className="h-4 w-4" />
            {language === 'id' ? 'Aksi Cepat Template & Bahasa:' : 'Quick Template Actions:'}
          </span>
          <span className="hidden sm:inline text-xs text-gray-500">
            {language === 'id' 
              ? 'Muat contoh berbahasa Indonesia atau terjemahkan seluruh data proyek secara instan dengan AI.' 
              : 'Load English sample or translate existing data with AI.'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleLoadSample}
            type="button"
            className="px-3 py-1.5 bg-[#00A99D] hover:bg-[#008f85] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Icon name="copy" className="h-3.5 w-3.5" />
            {t.specify.loadSampleBtn}
          </button>
          
          <button
            onClick={handleTranslateProject}
            disabled={isTranslating || !canGenerate}
            type="button"
            className="px-3 py-1.5 bg-white hover:bg-gray-50 text-[#333333] border border-gray-300 text-xs font-medium rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isTranslating ? (
              <>
                <Icon name="spinner" className="h-3.5 w-3.5 animate-spin text-[#00A99D]" />
                {t.specify.translatingProject}
              </>
            ) : (
              <>
                <Icon name="sparkles" className="h-3.5 w-3.5 text-[#FF7A59]" />
                {t.specify.translateProjectBtn}
              </>
            )}
          </button>

          <button
            onClick={handleClearForm}
            type="button"
            className="px-2.5 py-1.5 text-gray-500 hover:text-red-600 hover:bg-white/60 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            title={t.specify.clearFormBtn}
          >
            <Icon name="delete" className="h-3.5 w-3.5" />
            {t.specify.clearFormBtn}
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className={`p-3 rounded-lg text-sm flex items-center justify-between gap-2 animate-fadeIn ${
          feedbackMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex items-center gap-2">
            <Icon name={feedbackMsg.type === 'success' ? 'check' : 'lightbulb'} className="h-4 w-4 shrink-0" />
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-gray-400 hover:text-gray-600">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-bold text-[#333333] tracking-tight">{t.specify.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{t.specify.subtitle}</p>
          </div>
          
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-sm text-[#333333]">{t.specify.appNameLabel}</span>
            <input
              type="text"
              name="name"
              value={appData.idea.name}
              onChange={handleInputChange}
              className="bg-white p-2.5 rounded-lg border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition shadow-2xs text-sm"
              placeholder={t.specify.appNamePlaceholder}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-sm text-[#333333]">{t.specify.appAboutLabel}</span>
            <textarea
              name="about"
              value={appData.idea.about}
              onChange={handleInputChange}
              rows={3}
              className="bg-white p-2.5 rounded-lg border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition shadow-2xs text-sm"
              placeholder={t.specify.appAboutPlaceholder}
            />
          </label>
          
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-sm text-[#333333]">{t.specify.appAudienceLabel}</span>
            <textarea
              name="audience"
              value={appData.idea.audience}
              onChange={handleInputChange}
              rows={2}
              className="bg-white p-2.5 rounded-lg border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition shadow-2xs text-sm"
              placeholder={t.specify.appAudiencePlaceholder}
            />
          </label>
          
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-sm text-[#333333]">{t.specify.appProblemLabel}</span>
            <textarea
              name="problem"
              value={appData.idea.problem}
              onChange={handleInputChange}
              rows={2}
              className="bg-white p-2.5 rounded-lg border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition shadow-2xs text-sm"
              placeholder={t.specify.appProblemPlaceholder}
            />
          </label>

          <Card title={t.specify.locTitle} className="bg-[#FDFCEC]/70 border-[#EAE3C9]">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{t.specify.locLangLabel}</span>
                <textarea
                  name="languages"
                  value={appData.localization.languages}
                  onChange={handleLocalizationChange}
                  rows={2}
                  className="bg-white p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition text-xs"
                  placeholder={t.specify.locLangPlaceholder}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-700">{t.specify.locCurrLabel}</span>
                <textarea
                  name="currencies"
                  value={appData.localization.currencies}
                  onChange={handleLocalizationChange}
                  rows={2}
                  className="bg-white p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition text-xs"
                  placeholder={t.specify.locCurrPlaceholder}
                />
              </label>
              <div>
                <span className="text-xs font-semibold text-gray-700">{t.specify.locMeasureLabel}</span>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs">
                  {([['na', 'N/A'], ['metric', language === 'id' ? 'Metrik (cm/kg)' : 'Metric'], ['imperial', language === 'id' ? 'Imperial (in/lb)' : 'Imperial'], ['both', language === 'id' ? 'Keduanya' : 'Both']] as const).map(([value, label]) => (
                    <label key={value} className="flex items-center gap-1.5 cursor-pointer text-gray-700">
                      <input
                        type="radio"
                        name="measurement"
                        value={value}
                        checked={appData.localization.measurement === value}
                        onChange={handleLocalizationChange}
                        className="text-[#00A99D] focus:ring-[#00A99D]/50 bg-white border-gray-300"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Button onClick={handleGenerate} isLoading={isLoading} disabled={!canGenerate}>
            {appData.generatedSpecify.overview ? t.specify.regenerateBtn : t.specify.generateBtn}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex flex-col gap-6">
          <Card 
            title={t.specify.overviewTitle}
            actions={
              <button 
                onClick={() => setEditingField(editingField === 'overview' ? null : 'overview')} 
                className="text-gray-400 hover:text-[#00A99D] transition-colors p-1"
                aria-label={editingField === 'overview' ? t.finishEdit : t.edit}
              >
                <Icon name={editingField === 'overview' ? 'check' : 'edit'} className="h-4 w-4" />
              </button>
            }
          >
            {editingField === 'overview' ? (
              <textarea
                value={appData.generatedSpecify.overview}
                onChange={(e) => setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, overview: e.target.value}}))}
                rows={6}
                className="w-full bg-white p-2.5 rounded-lg border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition text-sm"
              />
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap min-h-[100px]">{appData.generatedSpecify.overview || t.specify.overviewPlaceholder}</p>
            )}
          </Card>
          
          <Card 
            title={t.specify.userStoriesTitle}
            actions={
              <button 
                onClick={() => setEditingField(editingField === 'userStories' ? null : 'userStories')} 
                className="text-gray-400 hover:text-[#00A99D] transition-colors p-1"
                aria-label={editingField === 'userStories' ? t.finishEdit : t.edit}
              >
                <Icon name={editingField === 'userStories' ? 'check' : 'edit'} className="h-4 w-4" />
              </button>
            }
          >
            {editingField === 'userStories' ? (
              <div className="space-y-2">
                {appData.generatedSpecify.userStories.map((story, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={story}
                      onChange={e => {
                        const newStories = [...appData.generatedSpecify.userStories];
                        newStories[i] = e.target.value;
                        setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, userStories: newStories}}));
                      }}
                      className="flex-grow bg-white p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition text-xs"
                    />
                    <button onClick={() => {
                      const newStories = appData.generatedSpecify.userStories.filter((_, idx) => idx !== i);
                      setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, userStories: newStories}}));
                    }} className="text-gray-400 hover:text-red-600 transition-colors p-1" aria-label={`Delete user story ${i + 1}`}>
                      <Icon name="delete" className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddUserStory} className="text-[#00A99D] hover:text-[#007c73] font-semibold transition-colors mt-2 text-xs flex items-center gap-1">
                  <Icon name="add" className="h-3.5 w-3.5" />
                  {t.specify.addUserStoryBtn}
                </button>
              </div>
            ) : appData.generatedSpecify.userStories.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 leading-relaxed">
                {appData.generatedSpecify.userStories.map((story, i) => <li key={i}>{story}</li>)}
              </ul>
            ) : (
              <p className="text-gray-400 text-xs italic">{language === 'id' ? 'User stories dari AI akan muncul di sini...' : 'AI-generated user stories will appear here...'}</p>
            )}
          </Card>

          <Card 
            title={t.specify.requirementsTitle}
            actions={
              <button 
                onClick={() => setEditingField(editingField === 'requirements' ? null : 'requirements')} 
                className="text-gray-400 hover:text-[#00A99D] transition-colors p-1"
                aria-label={editingField === 'requirements' ? t.finishEdit : t.edit}
              >
                <Icon name={editingField === 'requirements' ? 'check' : 'edit'} className="h-4 w-4" />
              </button>
            }
          >
            {editingField === 'requirements' ? (
               <div className="space-y-2">
                {appData.generatedSpecify.requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={e => {
                        const newReqs = [...appData.generatedSpecify.requirements];
                        newReqs[i] = e.target.value;
                        setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, requirements: newReqs}}));
                      }}
                      className="flex-grow bg-white p-2 rounded-md border border-[#EAE3C9] focus:ring-2 focus:ring-[#00A99D]/40 focus:border-[#00A99D] focus:outline-none transition text-xs"
                    />
                    <button onClick={() => {
                      const newReqs = appData.generatedSpecify.requirements.filter((_, idx) => idx !== i);
                      setAppData(prev => ({...prev, generatedSpecify: {...prev.generatedSpecify, requirements: newReqs}}));
                    }} className="text-gray-400 hover:text-red-600 transition-colors p-1" aria-label={`Delete requirement ${i + 1}`}>
                      <Icon name="delete" className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button onClick={handleAddRequirement} className="text-[#00A99D] hover:text-[#007c73] font-semibold transition-colors mt-2 text-xs flex items-center gap-1">
                  <Icon name="add" className="h-3.5 w-3.5" />
                  {t.specify.addRequirementBtn}
                </button>
              </div>
            ) : appData.generatedSpecify.requirements.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 leading-relaxed">
                {appData.generatedSpecify.requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            ) : (
              <p className="text-gray-400 text-xs italic">{language === 'id' ? 'Kebutuhan fungsional dari AI akan muncul di sini...' : 'AI-generated requirements will appear here...'}</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpecifyStage;
