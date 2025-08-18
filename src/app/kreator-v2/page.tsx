"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { STEPS_ORDER, STEPS, isStepEnabled } from "@/config/steps";
import Stepper from "@/components/configurator/Stepper";
// Removed right sidebar (Preview/Price/PDF)
import { Button } from "@radix-ui/themes";
import StepProduct from "@/components/configurator/steps/StepProduct";
import { StepLining } from "@/components/configurator/steps/StepLining";
import { StepSummary } from "@/components/configurator/steps/StepSummary";

export default function KreatorV2Page() {
  const { step, selectedProduct, material, lining, hardware, goToNextStep, goToPreviousStep } = useConfigurator();

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

        {/* Main Content - single column (right panel removed) */}
        <div className="grid grid-cols-1 gap-8">
          {/* Configuration Panel */}
          <div>
            <div className="bg-white rounded-2xl she-shadow-lg p-6 lg:p-8">
              {/* Step Header (hidden for product and configuration steps) */}
              {step !== 'product' && step !== 'lining' && (
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
              )}

              {/* Step Content */}
              <div className="mb-6">
                {step === 'product' && <StepProduct />}
                {step === 'lining' && <StepLining />}
                {step === 'summary' && <StepSummary />}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-she-secondary">
                <Button
                  onClick={goToPreviousStep}
                  disabled={step === 'product'}
                  variant="soft"
                  size="3"
                  className="rounded-2xl"
                >
                  {prevLabel}
                </Button>
                
                <Button
                  onClick={goToNextStep}
                  disabled={!canProceedUI}
                  variant="solid"
                  size="3"
                  className="rounded-2xl"
                >
                  {nextLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-xl she-shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-she-primary">
                Krok {STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).indexOf(step) + 1} z {STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).length}
              </span>
              <span className="text-xs text-she-dark">
                {Math.round(((STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).indexOf(step) + 1) / STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-she-secondary rounded-full h-3">
              <div 
                className="bg-she-primary h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).indexOf(step) + 1) / STEPS_ORDER.filter(s => {
                  const { selectedProduct } = useConfigurator.getState();
                  return isStepEnabled(s, selectedProduct);
                }).length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <Button
                onClick={goToPreviousStep}
                disabled={step === 'product'}
                variant="soft"
                size="2"
                className="rounded-xl"
              >
                {prevLabel}
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={!canProceedUI}
                variant="solid"
                size="2"
                className="rounded-xl"
              >
                {nextLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
