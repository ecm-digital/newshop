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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Wybór materiału</h3>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Materiał to podstawa Twojego produktu. Wybierz ten, który najlepiej pasuje do Twojego stylu i potrzeb.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATERIALS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMaterialNew(m.id)}
            className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-xl ${
              material === m.id 
                ? "border-black bg-black/5 shadow-lg" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg"
            }`}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-20 h-20 rounded-2xl border-2 flex-shrink-0 shadow-lg"
                style={{ 
                  backgroundColor: m.color,
                  borderColor: material === m.id ? "#000" : "#d1d5db"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-xl mb-3">{m.label}</div>
                <div className="text-sm text-gray-600">{m.description}</div>
              </div>
              {material === m.id && (
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {material && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-4 text-green-800">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold mb-1">Materiał wybrany!</div>
              <div className="text-base">
                <strong>{MATERIALS.find(m => m.id === material)?.label}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
