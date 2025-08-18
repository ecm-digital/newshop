"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";
import type { ThreadColor, EmbroideryPresetId } from "@/types/configurator";

const FONT_LABELS: Record<string, string> = {
  "sans": "Sans-serif",
  "serif": "Serif",
  "script": "Script",
};

const THREAD_COLORS: { id: string; label: string; color: string }[] = [
  { id: "black", label: "Czarny", color: "#000000" },
  { id: "white", label: "Biały", color: "#ffffff" },
  { id: "gold", label: "Złoty", color: "#ffd700" },
  { id: "silver", label: "Srebrny", color: "#c0c0c0" },
  { id: "red", label: "Czerwony", color: "#dc2626" },
  { id: "blue", label: "Niebieski", color: "#2563eb" },
];

const PRESET_ICONS: Record<string, string> = {
  "heart": "❤️",
  "star": "⭐",
  "smile": "😊",
  "alphabet-initial": "🔤",
};

export function StepEmbroidery() {
  const { selectedProduct, embroidery, setEmbroidery } = useConfigurator();
  const product = getProductConfig(selectedProduct);
  const max = product?.embroideryMaxChars ?? 16;
  const left = max - (embroidery.text?.length ?? 0);

  const isValid = embroidery.mode === "custom" ? embroidery.text.length > 0 : embroidery.presetId !== null;

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-xl font-semibold text-slate-800 mb-4">Haft personalizowany</h4>
        <p className="text-slate-600 mb-6">
          Dodaj personalizowany haft lub wybierz gotowy wzór.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="space-y-4">
        <label className="text-lg font-semibold text-slate-800">Typ haftu</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className={`
              flex-1 px-6 py-3 rounded-2xl border-2 transition-all duration-300 hover-lift font-semibold
              ${embroidery.mode === "custom" 
                ? "bg-gray-800 text-white border-gray-800 shadow-md" 
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
              }
            `}
            onClick={() => setEmbroidery({ mode: "custom", presetId: null })}
          >
            <span className="flex items-center justify-center gap-2">
              ✏️ <span>Personalizowany</span>
            </span>
          </button>
          <button
            className={`
              flex-1 px-6 py-3 rounded-2xl border-2 transition-all duration-300 hover-lift font-semibold
              ${embroidery.mode === "preset" 
                ? "bg-gray-800 text-white border-gray-800 shadow-md" 
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
              }
            `}
            onClick={() => setEmbroidery({ mode: "preset", text: "" })}
          >
            <span className="flex items-center justify-center gap-2">
              🎨 <span>Gotowiec</span>
            </span>
          </button>
        </div>
      </div>

      {embroidery.mode === "custom" ? (
        <div className="space-y-8">
          {/* Text Input - smaller */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Tekst haftu</label>
            <div className="relative">
              <input
                type="text"
                value={embroidery.text}
                onChange={(e) => {
                  const v = e.target.value.slice(0, max);
                  setEmbroidery({ text: v });
                }}
                placeholder={`Wpisz tekst (max ${max} znaków)`}
                className="w-full h-12 rounded-2xl glass border border-white/30 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-slate-400 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  left < 0 
                    ? "bg-red-100 text-red-600" 
                    : left < 5
                    ? "bg-amber-100 text-amber-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}>
                  {Math.max(0, left)}
                </span>
              </div>
            </div>
            <div className={`text-xs ${left < 0 ? "text-red-600" : "text-slate-500"}`}>
              Pozostało znaków: {Math.max(0, left)}
            </div>
          </div>

          {/* Font Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700">Rodzaj czcionki</label>
            <div className="flex flex-wrap gap-3">
              {(["sans", "serif", "script"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setEmbroidery({ font: f })}
                  className={`
                    flex-1 min-w-[100px] px-4 py-3 rounded-xl border-2 transition-all duration-300 hover-lift font-medium text-sm
                    ${embroidery.font === f 
                      ? "bg-gray-800 text-white border-gray-800 shadow-md" 
                      : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {FONT_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Wielkość czcionki
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
                {embroidery.size}px
              </span>
            </label>
            <div className="relative">
              <input
                type="range"
                min={12}
                max={36}
                step={1}
                value={embroidery.size}
                onChange={(e) => setEmbroidery({ size: Number(e.target.value) })}
                className="w-full h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-gray-500"
                style={{
                  background: `linear-gradient(to right, #374151 0%, #374151 ${((embroidery.size - 12) / (36 - 12)) * 100}%, #e2e8f0 ${((embroidery.size - 12) / (36 - 12)) * 100}%, #e2e8f0 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Mała (12px)</span>
              <span>Średnia (24px)</span>
              <span>Duża (36px)</span>
            </div>
          </div>

          {/* Thread Color Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700">Kolor nici</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {THREAD_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setEmbroidery({ threadColor: c.id as ThreadColor })}
                  className={`
                    relative h-12 w-full rounded-2xl border-2 transition-all duration-300 hover-lift she-shadow hover:she-shadow-warm
                    ${embroidery.threadColor === c.id 
                      ? "ring-2 ring-gray-800 ring-offset-2 scale-110" 
                      : "hover:scale-105"
                    }
                  `}
                  style={{ 
                    backgroundColor: c.color,
                    borderColor: c.id === 'white' ? '#e2e8f0' : c.color
                  }}
                  aria-label={c.label}
                  title={c.label}
                >
                  {embroidery.threadColor === c.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full ${c.id === 'white' || c.id === 'gold' || c.id === 'silver' ? 'bg-slate-800' : 'bg-white'} flex items-center justify-center`}>
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-500 text-center">
              {embroidery.threadColor && (
                <span className="font-medium">
                  Wybrano: {THREAD_COLORS.find(c => c.id === embroidery.threadColor)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">Wzory gotowe</h4>
            <p className="text-sm text-slate-600">
              Wybierz gotowy wzór lub inicjał
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["heart", "star", "smile", "alphabet-initial"].map((pid) => (
              <div
                key={pid}
                onClick={() => setEmbroidery({ presetId: pid as EmbroideryPresetId })}
                className={`
                  group relative cursor-pointer transition-all duration-300 hover-lift
                  glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow text-center
                  ${embroidery.presetId === pid 
                    ? 'ring-2 ring-gray-800 bg-gray-50 she-shadow-glow scale-105' 
                    : 'hover:bg-white/60 hover:scale-102'
                  }
                `}
              >
                {/* Selected marker */}
                {embroidery.presetId === pid && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                  {PRESET_ICONS[pid]}
                </div>
                <div className="text-sm text-slate-700 font-semibold group-hover:text-slate-900">
                  {pid === "alphabet-initial" ? "Inicjał" : pid}
                </div>

                {/* Hover indicator */}
                <div className={`
                  absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full transition-all duration-300
                  ${embroidery.presetId === pid 
                    ? 'bg-gray-800' 
                    : 'bg-slate-300 group-hover:bg-gray-600'
                  }
                `} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Message */}
      {!isValid && (
        <div className="text-center p-4 glass rounded-3xl she-shadow-lg border border-amber-200/50 bg-gradient-to-r from-amber-50/80 to-orange-50/80">
          <div className="inline-flex items-center gap-3 text-amber-700">
            <div className="w-8 h-8 bg-amber-100 rounded-2xl flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold text-sm">
              {embroidery.mode === "custom" 
                ? "Wpisz tekst haftu, aby przejść dalej" 
                : "Wybierz wzór haftu, aby przejść dalej"
              }
            </span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div className="text-center p-4 glass rounded-3xl she-shadow-lg border border-emerald-200/50 bg-gradient-to-r from-emerald-50/80 to-teal-50/80">
          <div className="inline-flex items-center gap-3 text-emerald-700 mb-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-sm">Haft skonfigurowany!</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            {embroidery.mode === "custom" 
              ? `"${embroidery.text}" • ${embroidery.font} • ${embroidery.threadColor}`
              : `Wzór: ${embroidery.presetId}`
            }
          </div>
        </div>
      )}
    </div>
  );
}
