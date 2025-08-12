"use client";
import React, { useMemo } from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";

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
    <div className="space-y-10">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Konfiguracja haftu</h3>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Dodaj personalizowany haft lub wybierz gotowy wzór, aby uczynić produkt unikalnym
        </p>
      </div>

      {/* Mode Selection */}
      <div className="space-y-4">
        <label className="text-lg font-bold text-gray-700">Typ haftu</label>
        <div className="flex flex-col sm:flex-row gap-4 text-base">
          <button
            className={`px-8 py-4 rounded-2xl border-2 transition-all ${
              embroidery.mode === "custom" 
                ? "bg-black text-white border-black shadow-lg" 
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg"
            }`}
            onClick={() => setEmbroidery({ mode: "custom", presetId: null })}
          >
            ✏️ Personalizowany
          </button>
          <button
            className={`px-8 py-4 rounded-2xl border-2 transition-all ${
              embroidery.mode === "preset" 
                ? "bg-black text-white border-black shadow-lg" 
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg"
            }`}
            onClick={() => setEmbroidery({ mode: "preset", text: "" })}
          >
            🎨 Gotowiec
          </button>
        </div>
      </div>

      {embroidery.mode === "custom" ? (
        <div className="space-y-8">
          {/* Text Input */}
          <div className="space-y-4">
            <label className="text-lg font-bold text-gray-700">
              Tekst haftu
            </label>
            <input
              type="text"
              value={embroidery.text}
              onChange={(e) => {
                const v = e.target.value.slice(0, max);
                setEmbroidery({ text: v });
              }}
              placeholder={`Wpisz tekst (max ${max} znaków)`}
              className="w-full h-16 rounded-2xl border-2 px-6 focus:ring-2 focus:ring-black focus:border-transparent text-xl font-medium"
            />
            <div className={`text-base ${left < 0 ? "text-red-600" : "text-gray-500"}`}>
              Pozostało znaków: {Math.max(0, left)}
            </div>
          </div>

          {/* Font Selection */}
          <div className="space-y-4">
            <label className="text-lg font-bold text-gray-700">Rodzaj czcionki</label>
            <div className="flex flex-wrap gap-4">
              {(["sans", "serif", "script"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setEmbroidery({ font: f })}
                  className={`px-8 py-4 rounded-2xl border-2 text-base transition-all ${
                    embroidery.font === f 
                      ? "bg-black text-white border-black shadow-lg" 
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg"
                  }`}
                >
                  {FONT_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <label className="text-lg font-bold text-gray-700">
              Wielkość czcionki: {embroidery.size}px
            </label>
            <input
              type="range"
              min={12}
              max={36}
              step={1}
              value={embroidery.size}
              onChange={(e) => setEmbroidery({ size: Number(e.target.value) })}
              className="w-full h-4 bg-gray-200 rounded-2xl appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-base text-gray-500">
              <span>12px</span>
              <span>24px</span>
              <span>36px</span>
            </div>
          </div>

          {/* Thread Color Selection */}
          <div className="space-y-4">
            <label className="text-lg font-bold text-gray-700">Kolor nici</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {THREAD_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setEmbroidery({ threadColor: c.id as any })}
                  className={`h-16 w-full rounded-2xl border-2 transition-all hover:scale-105 ${
                    embroidery.threadColor === c.id 
                      ? "ring-2 ring-black ring-offset-2" 
                      : "hover:shadow-lg"
                  }`}
                  style={{ backgroundColor: c.color }}
                  aria-label={c.label}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Wzory gotowe</h4>
            <p className="text-base text-gray-600">
              Wybierz gotowy wzór lub inicjał
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["heart", "star", "smile", "alphabet-initial"].map((pid) => (
              <button
                key={pid}
                onClick={() => setEmbroidery({ presetId: pid as any })}
                className={`rounded-2xl border-2 p-8 text-center transition-all hover:shadow-xl ${
                  embroidery.presetId === pid 
                    ? "border-black bg-black/5 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-xl"
                }`}
              >
                <div className="text-4xl mb-4">{PRESET_ICONS[pid]}</div>
                <div className="text-base text-gray-600 capitalize font-bold">
                  {pid === "alphabet-initial" ? "Inicjał" : pid}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Validation Message */}
      {!isValid && (
        <div className="flex items-center gap-4 text-amber-600 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-base font-bold">
            {embroidery.mode === "custom" 
              ? "Wpisz tekst haftu, aby przejść dalej" 
              : "Wybierz wzór haftu, aby przejść dalej"
            }
          </span>
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div className="flex items-center gap-4 text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="text-lg font-bold mb-2">Haft skonfigurowany!</div>
            <div className="text-base">
              {embroidery.mode === "custom" 
                ? `"${embroidery.text}" (${embroidery.font}, ${embroidery.threadColor})`
                : `Wzór: ${embroidery.presetId}`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
