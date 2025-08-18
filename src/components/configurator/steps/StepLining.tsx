"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import { StepMaterial } from "@/components/configurator/steps/StepMaterial";
import { StepHardware } from "@/components/configurator/steps/StepHardware";
import { StepEmbroidery } from "@/components/configurator/steps/StepEmbroidery";
import { getProductConfig } from "@/config/products";
import type { LiningColor } from "@/types/configurator";

const LINING_COLORS: { id: LiningColor; label: string; color: string; description: string }[] = [
  { 
    id: "white", 
    label: "Biały", 
    color: "#ffffff",
    description: "Klasyczna biała podszewka"
  },
  { 
    id: "black", 
    label: "Czarny", 
    color: "#000000",
    description: "Elegancka czarna podszewka"
  },
];

export function StepLining() {
  const { material, lining, setLining, selectedProduct } = useConfigurator();
  const product = getProductConfig(selectedProduct);
  const isWorek = product?.id === "worek";
  const needsHardware = !isWorek && Boolean(product?.enabledSteps.hardware);

  // No auto defaults; user must pick required options

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Krok 2 — Konfiguracja</h3>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          {isWorek
            ? "Wybierz materiał i ustaw haft (ten produkt nie posiada okuć)."
            : "Wybierz podszewkę, a następnie dobierz materiał, okucia oraz ustaw haft."}
        </p>
      </div>
      {!isWorek && (
        <div className="grid grid-cols-2 gap-3">
          {LINING_COLORS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLining(l.id)}
              className={`rounded-xl border p-4 text-left transition ${
                lining === l.id 
                  ? "border-black bg-black/5" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 w-full">
                <div 
                  className="w-12 h-12 rounded-lg border flex-shrink-0"
                  style={{ 
                    backgroundColor: l.color,
                    borderColor: l.id === "white" ? "#d1d5db" : "#000"
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-base">{l.label}</div>
                  <div className="text-xs text-gray-600">{l.description}</div>
                </div>
                {lining === l.id && (
                  <div className="ml-2 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center shadow">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        <StepMaterial />
      </div>

      {!isWorek && (
        <div className="mt-6">
          <StepHardware />
        </div>
      )}

      <div className="mt-6">
        <StepEmbroidery />
      </div>
    </div>
  );
}
