"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { PRODUCTS } from "@/config/products";

export default function Preview() {
  const { selectedProduct, material, lining, hardware, embroidery, extras } = useConfigurator();

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-2xl she-shadow p-6 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-she-dark mb-3">
          Wybierz produkt
        </h3>
        <p className="text-base text-she-primary">
          Rozpocznij konfigurację wybierając produkt
        </p>
      </div>
    );
  }

  const productConfig = PRODUCTS.find(p => p.id === selectedProduct);
  if (!productConfig) return null;

  // Calculate progress
  let completed = 0;
  if (selectedProduct) completed++;
  if (material) completed++;
  if (lining) completed++;
  if (hardware) completed++;
  if (embroidery.mode === 'custom' && embroidery.text) completed++;
  if (embroidery.mode === 'preset' && embroidery.presetId) completed++;
  if (extras.length > 0) completed++;
  const progress = (completed / 7) * 100; // Total steps: 7

  return (
    <div className="bg-white rounded-2xl she-shadow-lg p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-she-dark mb-2">
          Podgląd konfiguracji
        </h3>
        <p className="text-sm text-she-primary">
          {productConfig.name}
        </p>
      </div>

      {/* Visual Representation */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📦</div>
        <div className="text-lg font-medium text-she-dark">
          {productConfig.name}
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="space-y-3 mb-6">
        {material && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Materiał:</span>
            <span className="text-sm font-medium text-she-primary">{material}</span>
          </div>
        )}
        
        {lining && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Podszewka:</span>
            <span className="text-sm font-medium text-she-primary">{lining}</span>
          </div>
        )}
        
        {hardware && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Okucia:</span>
            <span className="text-sm font-medium text-she-primary">{hardware}</span>
          </div>
        )}
        
        {embroidery.mode === 'custom' && embroidery.text && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Haft:</span>
            <span className="text-sm font-medium text-she-primary">&ldquo;{embroidery.text}&rdquo;</span>
          </div>
        )}
        
        {embroidery.mode === 'preset' && embroidery.presetId && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Wzór haftu:</span>
            <span className="text-sm font-medium text-she-primary">{embroidery.presetId}</span>
          </div>
        )}
        
        {extras.length > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Dodatki:</span>
            <span className="text-sm font-medium text-she-primary">
              {extras.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-3 border-t border-she-secondary">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-she-primary font-medium">Postęp konfiguracji</span>
          <span className="text-xs text-she-dark">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-she-secondary rounded-full h-2">
          <div 
            className="bg-she-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
