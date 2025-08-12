"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import type { HardwareColor } from "@/types/configurator";

const HARDWARE_COLORS: { id: HardwareColor; label: string; color: string; description: string }[] = [
  { 
    id: "silver", 
    label: "Srebrny", 
    color: "#c0c0c0",
    description: "Klasyczne srebrne okucia i zamki"
  },
  { 
    id: "gold", 
    label: "Złoty", 
    color: "#ffd700",
    description: "Eleganckie złote okucia i zamki"
  },
];

export function StepHardware() {
  const { hardware, setHardware } = useConfigurator();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Wybór okuć i zamków</h3>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Okucia i zamki to metalowe elementy produktu. Wybierz kolor, który najlepiej pasuje do wybranego materiału.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {HARDWARE_COLORS.map((h) => (
          <button
            key={h.id}
            onClick={() => setHardware(h.id)}
            className={`rounded-2xl border-2 p-8 text-left transition-all hover:shadow-xl ${
              hardware === h.id 
                ? "border-black bg-black/5 shadow-lg" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-xl"
            }`}
          >
            <div className="flex items-start gap-6">
              <div 
                className="w-24 h-24 rounded-2xl border-2 flex-shrink-0 shadow-lg"
                style={{ 
                  backgroundColor: h.color,
                  borderColor: "#000"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-2xl mb-3">{h.label}</div>
                <div className="text-base text-gray-600">{h.description}</div>
              </div>
              {hardware === h.id && (
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {hardware && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-4 text-green-800">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold mb-1">Kolor okuć wybrany!</div>
              <div className="text-base">
                <strong>{HARDWARE_COLORS.find(h => h.id === hardware)?.label}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
