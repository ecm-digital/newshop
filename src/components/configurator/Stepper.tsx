"use client";
import React from "react";
import { STEPS_ORDER, STEPS } from "@/config/steps";
import type { StepKey } from "@/types/configurator";
import { useConfigurator } from "@/store/configurator";



export default function Stepper() {
  const { step, isStepValid, goToStep } = useConfigurator();

  function isStepCompleted(stepKey: StepKey): boolean {
    const stepIdx = STEPS_ORDER.indexOf(stepKey);
    const currentIdx = STEPS_ORDER.indexOf(step);
    return stepIdx < currentIdx && isStepValid(stepKey);
  }

  return (
    <>
      {/* Desktop Stepper */}
      <div className="hidden lg:flex items-center justify-center gap-3 mb-6">
        {STEPS_ORDER.map((stepKey, index) => {
          const stepValid = isStepValid(stepKey);
          const completed = isStepCompleted(stepKey);
          const isCurrent = stepKey === step;
          const isPast = index < STEPS_ORDER.indexOf(step);
          const isEnabled = stepValid || isPast;

          return (
            <div key={stepKey} className="flex items-center">
              {/* Step Circle */}
              <button
                onClick={() => isEnabled && goToStep(stepKey)}
                disabled={!isEnabled}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-200
                  ${isCurrent 
                    ? 'bg-she-primary text-white she-shadow-lg' 
                    : completed 
                    ? 'bg-she-success text-white she-shadow' 
                    : isPast 
                    ? 'bg-she-secondary text-she-dark she-shadow' 
                    : 'bg-white text-she-primary border border-she-secondary'
                  }
                  ${isEnabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                `}
              >
                {completed ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </button>

                             {/* Step Label */}
               <span className={`
                 ml-3 text-sm font-medium transition-colors duration-200
                 ${isCurrent 
                   ? 'text-she-primary' 
                   : completed 
                   ? 'text-she-success' 
                   : isPast 
                   ? 'text-she-dark' 
                   : 'text-she-primary opacity-60'
                 }
               `}>
                 {STEPS.find(s => s.key === stepKey)?.label}
               </span>

              {/* Separator */}
              {index < STEPS_ORDER.length - 1 && (
                <div className="w-8 h-0.5 bg-she-secondary mx-3" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
        {STEPS_ORDER.map((stepKey, index) => {
          const stepValid = isStepValid(stepKey);
          const completed = isStepCompleted(stepKey);
          const isCurrent = stepKey === step;
          const isPast = index < STEPS_ORDER.indexOf(step);
          const isEnabled = stepValid || isPast;

          return (
            <div key={stepKey} className="flex flex-col items-center">
              {/* Step Circle */}
              <button
                onClick={() => isEnabled && goToStep(stepKey)}
                disabled={!isEnabled}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-200
                  ${isCurrent 
                    ? 'bg-she-primary text-white she-shadow-lg' 
                    : completed 
                    ? 'bg-she-success text-white she-shadow' 
                    : isPast 
                    ? 'bg-she-secondary text-she-dark she-shadow' 
                    : 'bg-white text-she-primary border border-she-secondary'
                  }
                  ${isEnabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                `}
              >
                {completed ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </button>

              {/* Step Label */}
              <span className={`
                mt-2 text-[9px] font-medium text-center transition-colors duration-200
                ${isCurrent 
                  ? 'text-she-primary' 
                  : completed 
                  ? 'text-she-success' 
                  : isPast 
                  ? 'text-she-dark' 
                  : 'text-she-primary opacity-60'
                }
              `}>
                {STEPS.find(s => s.key === stepKey)?.label}
              </span>

              {/* Separator */}
              {index < STEPS_ORDER.length - 1 && (
                <div className="w-0.5 h-4 bg-she-secondary mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
