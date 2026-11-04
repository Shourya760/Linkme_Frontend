import { useState } from 'react';
import { ChevronRight, ChevronLeft, ExternalLink, Copy, Check, Eye, RotateCcw } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';
import Navbar from '../components/Navbar';
import StepperHeader from '../components/wizard/StepperHeader';
import { WIZARD_STEPS } from '../utils/steps';
import Step1Profile from '../components/wizard/Step1Profile';
import Step2Links from '../components/wizard/Step2Links';
import Step3Design from '../components/wizard/Step3Design';
import Step4Photos from '../components/wizard/Step4Photos';
import Step5Publish from '../components/wizard/Step5Publish';
import DevicePreview from '../components/DevicePreview';
import { getPortfolioUrl, getPortfolioHost } from '../utils/portfolioUrl';

export default function Home() {
  const {
    profile,
    loading,
    saving,
    saveProfile,
    updateProfile,
    updateTheme,
    updateSocial,
    toggleSocial,
    addCustomLink,
    updateCustomLink,
    removeCustomLink,
    addPhoto,
    removePhoto,
    addInterest,
    removeInterest,
    addAchievement,
    removeAchievement,
    resetToDefault,
  } = useProfile();

  const [currentStep, setCurrentStep] = useState(1);
  const [mobileViewTab, setMobileViewTab] = useState('editor');
  const [copied, setCopied] = useState(false);

  const shareUrl = getPortfolioUrl(profile.username);

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = async () => {
    if (currentStep >= WIZARD_STEPS.length) return;
    await saveProfile();
    setCurrentStep((step) => step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Clear your profile content? Your username and email will stay.')) {
      resetToDefault();
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/70 text-zinc-900 pb-8 sm:pb-16 overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex lg:hidden mb-4 p-1 bg-zinc-100 border border-zinc-200 rounded-xl">
          <button
            type="button"
            onClick={() => setMobileViewTab('editor')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${mobileViewTab === 'editor' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMobileViewTab('preview')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${mobileViewTab === 'preview' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            <Eye size={14} />
            <span>Preview</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className={`lg:col-span-7 space-y-6 ${mobileViewTab === 'preview' ? 'hidden lg:block' : ''}`}>
            <section className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
              <div className="space-y-0.5 min-w-0 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${profile.isPublic ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Bio link builder
                  </span>
                </div>
                <p className="text-sm font-semibold text-zinc-900 font-mono truncate">
                  {profile.username ? (
                    <>{getPortfolioHost()}/<span className="text-zinc-600">{profile.username}</span></>
                  ) : (
                    'Choose your username'
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-zinc-50 border border-zinc-200 text-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold hover:border-zinc-300 hover:bg-zinc-100 transition active:scale-95 shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-600 stroke-[2.5]" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-zinc-500" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-800 transition shadow-2xs"
                >
                  <span>View Portfolio</span>
                  <ExternalLink size={13} className="text-zinc-400" />
                </a>
              </div>
            </section>

            <StepperHeader currentStep={currentStep} onSelectStep={(stepId) => setCurrentStep(stepId)} />

            {currentStep === 1 && <Step1Profile profile={profile} updateProfile={updateProfile} />}

            {currentStep === 2 && (
              <Step2Links
                profile={profile}
                updateSocial={updateSocial}
                toggleSocial={toggleSocial}
                addCustomLink={addCustomLink}
                updateCustomLink={updateCustomLink}
                removeCustomLink={removeCustomLink}
              />
            )}

            {currentStep === 3 && <Step3Design profile={profile} updateTheme={updateTheme} />}

            {currentStep === 4 && (
              <Step4Photos
                profile={profile}
                addPhoto={addPhoto}
                removePhoto={removePhoto}
                addInterest={addInterest}
                removeInterest={removeInterest}
                addAchievement={addAchievement}
                removeAchievement={removeAchievement}
              />
            )}

            {currentStep === 5 && <Step5Publish profile={profile} />}

            <div className="bg-white border border-zinc-200/90 rounded-2xl p-3 sm:p-5 flex items-center justify-between gap-2 sm:gap-3 shadow-2xs">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-600 transition cursor-pointer px-2 py-1"
                  title="Clear profile content"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Clear Content</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              )}

              {currentStep < WIZARD_STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading || saving}
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <span className="sm:hidden">{saving ? 'Saving…' : 'Next'}</span>
                  <span className="hidden sm:inline">{saving ? 'Saving…' : loading ? 'Loading…' : `Save & Next: ${WIZARD_STEPS[currentStep]?.title}`}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs active:scale-95"
                >
                  <span className="sm:hidden">Launch</span>
                  <span className="hidden sm:inline">Launch Live Portfolio</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          <div className={`lg:col-span-5 lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)] ${mobileViewTab === 'editor' ? 'hidden lg:block' : ''}`}>
            <DevicePreview profile={profile} />
          </div>
        </div>
      </main>
    </div>
  );
}
