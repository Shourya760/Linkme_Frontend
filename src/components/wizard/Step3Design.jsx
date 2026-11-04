import { Check, Sliders } from 'lucide-react';
import { THEMES, COLOR_PRESETS, BUTTON_STYLES, FONT_STYLES } from '../../utils/storage';

export default function Step3Design({ profile, updateTheme }) {
  const currentThemeId = profile?.theme?.id || 'clean';
  const currentAccent = profile?.theme?.accentColor || '#18181b';
  const currentButtonStyle = profile?.theme?.buttonStyle || 'rounded';
  const currentFontStyle = profile?.theme?.fontStyle || 'sans';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">3. Design</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Theme, accent color, buttons, and type.</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Select Visual Theme Preset</label>
          <span className="text-[11px] text-zinc-400">{THEMES.length} Curated Styles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEMES.map((theme) => {
            const isSelected = currentThemeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => updateTheme({ id: theme.id, accentColor: theme.accentColor })}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected ? 'border-zinc-900 ring-2 ring-zinc-900/10 shadow-sm bg-white' : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-2xs'
                }`}
              >
                <div className={`h-8 w-full rounded-xl bg-gradient-to-r ${theme.previewGradient} border border-black/10 mb-3 flex items-center justify-between px-3`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-black/40" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-black/20 text-white backdrop-blur-xs">
                    {theme.id}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                      <span>{theme.name}</span>
                      {isSelected && <span className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px]">✓</span>}
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{theme.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Accent color</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Used on badges and highlights.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: currentAccent }} />
            <span className="text-xs font-mono text-zinc-600 font-medium">{currentAccent}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = currentAccent.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => updateTheme({ accentColor: preset.hex })}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition cursor-pointer ${
                  isSelected ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900/10' : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                }`}
                title={preset.name}
              >
                <span className="w-7 h-7 rounded-full shadow-2xs flex items-center justify-center transition group-hover:scale-105" style={{ backgroundColor: preset.hex }}>
                  {isSelected && <Check size={14} className="text-white drop-shadow-sm" />}
                </span>
                <span className="text-[10px] text-zinc-600 font-medium truncate w-full text-center">{preset.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
          <label className="text-xs font-medium text-zinc-700 flex items-center gap-1.5">
            <Sliders size={13} className="text-zinc-400" />
            <span>Custom Color:</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentAccent}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border border-zinc-200 p-0.5"
            />
            <input
              type="text"
              value={currentAccent}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
              placeholder="#18181b"
              className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-zinc-200 uppercase"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Button Curvature & Shape</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BUTTON_STYLES.map((style) => {
            const isSelected = currentButtonStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateTheme({ buttonStyle: style.id })}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  isSelected ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs' : 'border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-zinc-50'
                }`}
              >
                <div className={`w-full py-1.5 text-xs font-semibold mb-1.5 border ${
                  isSelected ? 'bg-white text-zinc-900 border-white' : 'bg-white border-zinc-200 text-zinc-800'
                } ${style.radius}`}>
                  Preview
                </div>
                <p className="text-[11px] font-medium">{style.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Typography Style</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {FONT_STYLES.map((font) => {
            const isSelected = currentFontStyle === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateTheme({ fontStyle: font.id })}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs' : 'border-zinc-200 hover:border-zinc-300 text-zinc-800 bg-zinc-50'
                }`}
              >
                <p className={`text-base font-bold mb-0.5 ${font.styleClass}`}>Aa Bb Cc 123</p>
                <p className={`text-xs ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{font.label}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
