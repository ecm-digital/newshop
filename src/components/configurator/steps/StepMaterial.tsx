"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import type { MaterialType } from "@/types/configurator";

const MATERIALS: { id: MaterialType; label: string; color: string; description: string }[] = [
  { 
    id: "ekoskora", 
    label: "Ekoskóra", 
    color: "#8B4513",
    description: "Trwała i elegancka ekologiczna skóra"
  },
  { 
    id: "sztruks", 
    label: "Sztruks", 
    color: "#2F4F4F",
    description: "Klasyczny materiał o charakterystycznej fakturze"
  },
  { 
    id: "len-a", 
    label: "Len — wzór A", 
    color: "#F5DEB3",
    description: "Naturalny len w delikatnym wzorze"
  },
  { 
    id: "len-b", 
    label: "Len — wzór B", 
    color: "#DEB887",
    description: "Naturalny len w geometrycznym wzorze"
  },
  { 
    id: "len-c", 
    label: "Len — wzór C", 
    color: "#D2B48C",
    description: "Naturalny len w kwiatowym wzorze"
  },
];

export function StepMaterial() {
  const { material, setMaterialNew } = useConfigurator();

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold text-amber-900 mb-4">Materiał</h4>
        <p className="text-amber-700 mb-6">
          Wybierz najwyższej jakości materiał dla swojej torebki SHE.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATERIALS.map((m) => (
          <div
            key={m.id}
            onClick={() => setMaterialNew(m.id)}
            className={`
              group relative cursor-pointer transition-all duration-300 hover-lift
              glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow
              ${material === m.id 
                ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 she-shadow-glow scale-105' 
                : 'hover:bg-white/60 hover:scale-102'
              }
            `}
          >
            {/* Selected marker */}
            {material === m.id && (
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full she-gradient-primary text-white flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div 
                className={`
                  w-20 h-20 rounded-3xl border-2 flex-shrink-0 transition-all duration-300
                  she-shadow group-hover:she-shadow-warm group-hover:scale-110
                  ${material === m.id ? 'scale-110' : ''}
                `}
                style={{ 
                  backgroundColor: m.color,
                  borderColor: material === m.id ? "#8B4513" : "#e2e8f0"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-amber-900 text-lg mb-2 group-hover:text-amber-950">{m.label}</div>
                <div className="text-sm text-amber-700">{m.description}</div>
              </div>
            </div>

            {/* Hover indicator */}
            <div className={`
              absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-300
              ${material === m.id 
                ? 'she-gradient-primary' 
                : 'bg-amber-300 group-hover:she-gradient-warm'
              }
            `} />
          </div>
        ))}
      </div>

      {material && (
        <div className="text-center p-4 glass rounded-3xl she-shadow-lg border border-emerald-200/50 bg-gradient-to-r from-emerald-50/80 to-teal-50/80">
          <div className="inline-flex items-center gap-3 text-emerald-700">
            <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">
              Materiał wybrany: <strong>{MATERIALS.find(m => m.id === material)?.label}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
