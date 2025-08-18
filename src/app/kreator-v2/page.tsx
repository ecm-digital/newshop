"use client";

import React, { useEffect } from "react";
import { useConfigurator } from "@/store/configurator";
import { STEPS } from "@/config/steps";
import Stepper from "@/components/configurator/Stepper";
// Removed right sidebar (Preview/Price/PDF)
import { Button } from "@radix-ui/themes";
import StepProduct from "@/components/configurator/steps/StepProduct";
import { StepLining } from "@/components/configurator/steps/StepLining";
import { StepSummary } from "@/components/configurator/steps/StepSummary";

export default function KreatorV2Page() {
  const { step, selectedProduct, material, lining, hardware, goToNextStep, goToPreviousStep } = useConfigurator();

  // Scroll to top on step change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const nextLabel = step === 'product'
    ? 'Personalizuj wybrany produkt'
    : step === 'lining'
    ? 'Przejdź do podsumowania'
    : step === 'summary'
    ? 'Złóż zamówienie'
    : 'Dalej';

  const prevLabel = step === 'lining'
    ? 'Wróć do wyboru produktu'
    : step === 'summary'
    ? 'Wróć do konfiguracji'
    : 'Wstecz';

  const requiresHardware = Boolean(useConfigurator.getState().selectedProduct && requireHardware(useConfigurator.getState().selectedProduct));
  function requireHardware(productKey: string | null) { return productKey !== 'worek' && true; }
  const canProceedUI = step === 'product'
    ? Boolean(selectedProduct)
    : step === 'lining'
    ? Boolean(material && lining && (!requiresHardware || hardware))
    : true;

  return (
    <div className="min-h-screen bg-white pb-28 sm:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Konfigurator SHE
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Spersonalizuj swoją luksusową torebkę skórzaną z najwyższej jakości materiałów
        </p>
        </header>

        {/* Stepper */}
        <div className="mb-6">
          <Stepper />
        </div>

        {/* Main Content - single column (right panel removed) */}
        <div className="grid grid-cols-1 gap-8">
          {/* Configuration Panel */}
          <div>
            <div className="glass-strong rounded-3xl she-shadow-lg p-6 lg:p-8 hover-lift">
              {/* Step Header (hidden for product and configuration steps) */}
              {step !== 'product' && step !== 'lining' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {STEPS.find(s => s.key === step)?.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {STEPS.find(s => s.key === step)?.description}
                  </p>
                </div>
              )}

              {/* Step Content */}
              <div className="mb-6">
                {step === 'product' && <StepProduct />}
                {step === 'lining' && <StepLining />}
                {step === 'summary' && <StepSummary />}
              </div>

              {/* Navigation moved to sticky bottom bar */}
            </div>
          </div>
        </div>


      </div>
      {/* Sticky bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={goToPreviousStep}
              disabled={step === 'product'}
              variant="soft"
              size="3"
              className="rounded-xl px-6 py-3 bg-white text-gray-800 hover:bg-gray-50 transition-all duration-200 border border-gray-200 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {prevLabel}
            </Button>
            
            <Button
              onClick={goToNextStep}
              disabled={!canProceedUI}
              variant="solid"
              size="3"
              className="rounded-xl px-6 py-3 bg-gray-800 hover:bg-black text-white transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50"
            >
              {nextLabel}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
