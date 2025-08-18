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
      {/* Desktop Stepper - Glass morphism with modern design */}
      <div className="hidden lg:block mb-6">
        {(() => {
          const stepsAll = STEPS_ORDER;
          const visibleCount = stepsAll.filter(isStepEnabledForProduct).length || stepsAll.length;
          const currentIdx = stepsAll.indexOf(step);
          const percent = Math.round(((currentIdx + 1) / visibleCount) * 100);
          return (
            <>
              <Tabs.Root value={step} onValueChange={(v) => goToStep(v as StepKey)}>
                <Tabs.List className="flex gap-3 bg-white rounded-2xl p-2 border border-gray-200">
                  {stepsAll.map((stepKey, index) => {
                    const allowedForProduct = isStepEnabledForProduct(stepKey);
                    const disabled = !allowedForProduct || (!isStepValid(stepKey) && index > currentIdx);
                    const isActive = stepKey === step;
                    const isCompleted = isStepCompleted(stepKey);
                    
                    return (
                    <Tabs.Trigger
                      key={stepKey}
                      value={stepKey}
                      disabled={disabled}
                      className={`
                        relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                        ${isActive 
                          ? 'bg-gray-800 text-white shadow-md' 
                          : isCompleted
                          ? 'bg-gray-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                        )}
                        <span>{STEPS.find(s => s.key === stepKey)?.label}</span>
                      </div>
                    </Tabs.Trigger>
                  );})}
                </Tabs.List>
              </Tabs.Root>
            </>
          );
        })()}
      </div>

      {/* Mobile Stepper - Clean design */}
      <div className="lg:hidden mb-6">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          {/* Progress info */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Krok {STEPS_ORDER.indexOf(step) + 1} z {STEPS_ORDER.filter(isStepEnabledForProduct).length}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {Math.round(((STEPS_ORDER.indexOf(step) + 1) / STEPS_ORDER.filter(isStepEnabledForProduct).length) * 100)}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-gray-800 transition-all duration-500 ease-out rounded-full"
              style={{ 
                width: `${Math.round(((STEPS_ORDER.indexOf(step) + 1) / STEPS_ORDER.filter(isStepEnabledForProduct).length) * 100)}%` 
              }}
            />
          </div>
          
          {/* Current step info */}
          <div className="mt-3 text-center">
            <span className="text-sm font-medium text-gray-600">
              {STEPS.find(s => s.key === step)?.title}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
