"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";

const MATERIAL_LABELS: Record<string, string> = {
  "ekoskora": "Ekoskóra",
  "sztruks": "Sztruks",
  "len-a": "Len — wzór A",
  "len-b": "Len — wzór B",
  "len-c": "Len — wzór C",
};

const LINING_LABELS: Record<string, string> = {
  "white": "Biały",
  "black": "Czarny",
};

const HARDWARE_LABELS: Record<string, string> = {
  "silver": "Srebrny",
  "gold": "Złoty",
};

const EXTRA_LABELS: Record<string, string> = {
  "raczki-czarna-skora": "Rączki - czarna skóra",
  "raczki-brazowa-skora": "Rączki - brązowa skóra",
  "pasek-czarna-skora": "Pasek - czarna skóra",
  "pasek-brazowa-skora": "Pasek - brązowa skóra",
  "kosmetyczka-rozmiar-S": "Rozmiar S",
  "kosmetyczka-rozmiar-M": "Rozmiar M",
  "kosmetyczka-rozmiar-L": "Rozmiar L",
};

export function StepSummary() {
  const { selectedProduct, material, lining, hardware, embroidery, extras, setStep } = useConfigurator();
  
  const product = getProductConfig(selectedProduct);

  if (!product) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-6xl mb-6">❌</div>
        <div className="text-2xl font-bold mb-3">Brak produktu</div>
        <div className="text-lg">Najpierw wybierz produkt</div>
      </div>
    );
  }

  // Price calculation removed for minimalist summary

  // Simplified summary: no save/order buttons

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">
          Podsumowanie konfiguracji
        </h3>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Sprawdź wszystkie wybory przed dodaniem do koszyka
        </p>
      </div>

      <div className="space-y-4">
        {/* Product */}
        <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-2xl flex items-center justify-center she-shadow">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-lg">Produkt</div>
                <div className="text-sm text-slate-600">{product.name}</div>
              </div>
            </div>
            <button
              onClick={() => setStep("product")}
              className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
            >
              Zmień
            </button>
          </div>
        </div>

        {/* Material */}
        {material && (
          <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center she-shadow">
                  <span className="text-2xl">🧶</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Materiał</div>
                  <div className="text-sm text-slate-600">{MATERIAL_LABELS[material]}</div>
                </div>
              </div>
              <button
                onClick={() => { setStep("lining"); }}
                className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
              >
                Zmień
              </button>
            </div>
          </div>
        )}

        {/* Lining */}
        {lining && (
          <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center she-shadow">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Podszewka</div>
                  <div className="text-sm text-slate-600">{LINING_LABELS[lining]}</div>
                </div>
              </div>
              <button
                onClick={() => { setStep("lining"); }}
                className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
              >
                Zmień
              </button>
            </div>
          </div>
        )}

        {/* Hardware */}
        {hardware && product.enabledSteps.hardware && (
          <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center she-shadow">
                  <span className="text-2xl">🔧</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Okucia i zamki</div>
                  <div className="text-sm text-slate-600">{HARDWARE_LABELS[hardware]}</div>
                </div>
              </div>
              <button
                onClick={() => { setStep("lining"); }}
                className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
              >
                Zmień
              </button>
            </div>
          </div>
        )}

        {/* Embroidery */}
        {(embroidery.text || embroidery.presetId) && (
          <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center she-shadow">
                  <span className="text-2xl">✂️</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Haft</div>
                  <div className="text-sm text-slate-600">
                    {embroidery.mode === "custom" 
                      ? `"${embroidery.text}" • ${embroidery.font} • ${embroidery.threadColor}`
                      : `Wzór: ${embroidery.presetId}`
                    }
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setStep("lining"); }}
                className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
              >
                Zmień
              </button>
            </div>
          </div>
        )}

        {/* Extras */}
        {extras.length > 0 && (
          <div className="glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center she-shadow">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Opcje dodatkowe</div>
                  <div className="text-sm text-slate-600">
                    {extras.map(e => EXTRA_LABELS[e]).join(" • ")}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep("lining")}
                className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover-lift she-shadow hover:she-shadow-lg"
              >
                Zmień
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown removed */}

      {/* Actions removed (order/save) per request */}
    </div>
  );
}
