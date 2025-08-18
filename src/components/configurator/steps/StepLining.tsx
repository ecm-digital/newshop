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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Personalizacja torebki</h3>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {isWorek
            ? "Wybierz materiał i dodaj haft do swojego worka."
            : "Dostosuj swoją torebkę SHE - wybierz podszewkę, materiał, okucia i haft."}
        </p>
      </div>
      {!isWorek && (
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-amber-900 mb-4">Podszewka</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LINING_COLORS.map((l) => (
              <div
                key={l.id}
                onClick={() => setLining(l.id)}
                className={`
                  group relative cursor-pointer transition-all duration-300 hover-lift
                  glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow
                  ${lining === l.id 
                    ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 she-shadow-glow scale-105' 
                    : 'hover:bg-white/60 hover:scale-102'
                  }
                `}
              >
                {/* Selected marker */}
                {lining === l.id && (
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full she-gradient-primary text-white flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="flex items-center gap-4 w-full">
                  <div 
                    className={`
                      w-20 h-20 rounded-3xl border-2 flex-shrink-0 transition-all duration-300
                      she-shadow group-hover:she-shadow-warm group-hover:scale-110
                      ${lining === l.id ? 'scale-110' : ''}
                    `}
                    style={{ 
                      backgroundColor: l.color,
                      borderColor: l.id === "white" ? "#e2e8f0" : "#334155"
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-amber-900 text-xl mb-1 group-hover:text-amber-950">{l.label}</div>
                    <div className="text-sm text-amber-700">{l.description}</div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`
                  absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-300
                  ${lining === l.id 
                    ? 'she-gradient-primary' 
                    : 'bg-amber-300 group-hover:she-gradient-warm'
                  }
                `} />
              </div>
            ))}
          </div>
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
