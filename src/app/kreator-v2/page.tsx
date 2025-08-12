"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { STEPS_ORDER, STEPS } from "@/config/steps";
import Stepper from "@/components/configurator/Stepper";
import Preview from "@/components/configurator/Preview";
import StepProduct from "@/components/configurator/steps/StepProduct";
import { StepMaterial } from "@/components/configurator/steps/StepMaterial";
import { StepLining } from "@/components/configurator/steps/StepLining";
import { StepHardware } from "@/components/configurator/steps/StepHardware";
import { StepEmbroidery } from "@/components/configurator/steps/StepEmbroidery";
import { StepExtras } from "@/components/configurator/steps/StepExtras";
import { StepSummary } from "@/components/configurator/steps/StepSummary";

export default function KreatorV2Page() {
  const { step, goToNextStep, goToPreviousStep, canGoToNextStep } = useConfigurator();

  return (
    <div className="min-h-screen she-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-she-dark mb-2">
            Konfigurator Personalizacji
          </h1>
          <p className="text-base sm:text-lg text-she-primary">
            Stwórz swój wymarzony produkt krok po kroku
          </p>
        </header>

        {/* Stepper */}
        <div className="mb-6">
          <Stepper />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl she-shadow-lg p-6 lg:p-8">
              {/* Step Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-she-primary text-white rounded-full flex items-center justify-center mr-4 she-shadow">
                  <span className="text-lg font-semibold">{STEPS_ORDER.indexOf(step) + 1}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-she-dark">
                    {STEPS.find(s => s.key === step)?.title}
                  </h2>
                  <p className="text-sm text-she-primary">
                    {STEPS.find(s => s.key === step)?.description}
                  </p>
                </div>
              </div>

              {/* Step Content */}
              <div className="mb-6">
                {step === 'product' && <StepProduct />}
                {step === 'material' && <StepMaterial />}
                {step === 'lining' && <StepLining />}
                {step === 'hardware' && <StepHardware />}
                {step === 'embroidery' && <StepEmbroidery />}
                {step === 'extras' && <StepExtras />}
                {step === 'summary' && <StepSummary />}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-she-secondary">
                <button
                  onClick={goToPreviousStep}
                  disabled={step === 'product'}
                  className="px-8 py-3 bg-white text-she-primary border border-she-secondary rounded-2xl font-medium transition-all duration-200 hover:bg-she-light hover:border-she-primary disabled:opacity-50 disabled:cursor-not-allowed she-shadow"
                >
                  Wstecz
                </button>
                
                <button
                  onClick={goToNextStep}
                  disabled={!canGoToNextStep}
                  className="px-8 py-3 bg-she-primary text-white rounded-2xl font-medium transition-all duration-200 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed she-shadow-lg"
                >
                  {step === 'summary' ? 'Złóż zamówienie' : 'Dalej'}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Preview />
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-xl she-shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-she-primary">
                Krok {STEPS_ORDER.indexOf(step) + 1} z {STEPS_ORDER.length}
              </span>
              <span className="text-xs text-she-dark">
                {Math.round(((STEPS_ORDER.indexOf(step) + 1) / STEPS_ORDER.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-she-secondary rounded-full h-3">
              <div 
                className="bg-she-primary h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((STEPS_ORDER.indexOf(step) + 1) / STEPS_ORDER.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <button
                onClick={goToPreviousStep}
                disabled={step === 'product'}
                className="px-3 py-2 text-xs bg-white text-she-primary border border-she-secondary rounded-xl font-medium transition-all duration-200 hover:bg-she-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Wstecz
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoToNextStep}
                className="px-3 py-2 text-xs bg-she-primary text-white rounded-xl font-medium transition-all duration-200 hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 'summary' ? 'Zamów' : 'Dalej'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
