"use client";
import React from "react";
import { Tabs } from "@radix-ui/themes";
import { STEPS_ORDER, STEPS, isStepEnabled } from "@/config/steps";
import type { StepKey } from "@/types/configurator";
import { useConfigurator } from "@/store/configurator";



export default function Stepper() {
  const { step, isStepValid, goToStep, selectedProduct } = useConfigurator();

  function isStepCompleted(stepKey: StepKey): boolean {
    const stepIdx = STEPS_ORDER.indexOf(stepKey);
    const currentIdx = STEPS_ORDER.indexOf(step);
    return stepIdx < currentIdx && isStepValid(stepKey);
  }

  function isStepEnabledForProduct(stepKey: StepKey): boolean {
    return isStepEnabled(stepKey, selectedProduct);
  }

  return (
    <>
      {/* Desktop Stepper - Radix Tabs with pills and progress */}
      <div className="hidden lg:block mb-4">
        {(() => {
          const stepsAll = STEPS_ORDER;
          const visibleCount = stepsAll.filter(isStepEnabledForProduct).length || stepsAll.length;
          const currentIdx = stepsAll.indexOf(step);
          const percent = Math.round(((currentIdx + 1) / visibleCount) * 100);
          return (
            <>
              <Tabs.Root value={step} onValueChange={(v) => goToStep(v as StepKey)}>
                <Tabs.List className="flex gap-2 bg-white/60 backdrop-blur rounded-xl p-1 border border-she-secondary">
                  {stepsAll.map((stepKey, index) => {
                    const allowedForProduct = isStepEnabledForProduct(stepKey);
                    const disabled = !allowedForProduct || (!isStepValid(stepKey) && index > currentIdx);
                    return (
                    <Tabs.Trigger
                      key={stepKey}
                      value={stepKey}
                      disabled={disabled}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow ${stepKey === step ? '' : 'hover:bg-she-light'}`}
                    >
                      {index + 1}. {STEPS.find(s => s.key === stepKey)?.label}
                    </Tabs.Trigger>
                  );})}
                </Tabs.List>
              </Tabs.Root>
              <div className="mt-3 h-2 w-full bg-she-secondary rounded-full overflow-hidden">
                <div className="h-2 bg-amber-700 transition-all" style={{ width: `${percent}%` }} />
              </div>
            </>
          );
        })()}
      </div>

      {/* Mobile Stepper */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
        {STEPS_ORDER.map((stepKey, index) => {
          const stepValid = isStepValid(stepKey);
          const completed = isStepCompleted(stepKey);
          const isCurrent = stepKey === step;
          const isPast = index < STEPS_ORDER.indexOf(step);
          const isEnabledForProduct = isStepEnabledForProduct(stepKey);
          const isEnabled = (stepValid || isPast) && isEnabledForProduct;

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
              {index < STEPS_ORDER.filter(s => isStepEnabledForProduct(s)).length - 1 && (
                <div className="w-0.5 h-4 bg-she-secondary mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
