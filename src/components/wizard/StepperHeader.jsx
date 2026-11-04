import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '../../utils/steps';

export default function StepperHeader({ currentStep, onSelectStep }) {
  const progressPercent = Math.round(((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100);

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Step {currentStep} of {WIZARD_STEPS.length}
          </span>
          <p className="text-xs font-semibold text-zinc-800 truncate">
            {WIZARD_STEPS[currentStep - 1]?.title}
          </p>
        </div>
        <span className="text-xs font-bold text-zinc-900 font-mono shrink-0">
          {progressPercent}%
        </span>
      </div>

      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-zinc-900 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {WIZARD_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl text-left transition cursor-pointer group ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : isDone
                    ? 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200/80'
                    : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDone
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'
                }`}
              >
                {isDone ? <Check size={14} className="stroke-[2.5]" /> : <Icon size={14} />}
              </div>

              <div className="hidden sm:block min-w-0">
                <p className={`text-[11px] font-bold tracking-tight truncate leading-tight ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                  {step.title}
                </p>
                <p className={`text-[10px] truncate leading-tight ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
