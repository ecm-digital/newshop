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
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-semibold text-slate-800 mb-4">Okucia i zamki</h4>
        <p className="text-slate-600 mb-6">
          Wybierz kolor okuć dopasowany do materiału.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HARDWARE_COLORS.map((h) => (
          <div
            key={h.id}
            onClick={() => setHardware(h.id)}
            className={`
              group relative cursor-pointer transition-all duration-300 hover-lift
              glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow
              ${hardware === h.id 
                ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 she-shadow-glow scale-105' 
                : 'hover:bg-white/60 hover:scale-102'
              }
            `}
          >
            {/* Selected marker */}
            {hardware === h.id && (
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg animate-pulse">
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
                  ${hardware === h.id ? 'scale-110' : ''}
                `}
                style={{ 
                  backgroundColor: h.color,
                  borderColor: hardware === h.id ? "#6366f1" : "#334155"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 text-lg mb-2 group-hover:text-slate-900">{h.label}</div>
                <div className="text-sm text-slate-600">{h.description}</div>
              </div>
            </div>

            {/* Hover indicator */}
            <div className={`
              absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-300
              ${hardware === h.id 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                : 'bg-slate-300 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-500'
              }
            `} />
          </div>
        ))}
      </div>

      {hardware && (
        <div className="text-center p-4 glass rounded-3xl she-shadow-lg border border-emerald-200/50 bg-gradient-to-r from-emerald-50/80 to-teal-50/80">
          <div className="inline-flex items-center gap-3 text-emerald-700">
            <div className="w-8 h-8 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">
              Okucia wybrane: <strong>{HARDWARE_COLORS.find(h => h.id === hardware)?.label}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
