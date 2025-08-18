"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";

interface PriceBreakdown {
  basePrice: number;
  materialCost: number;
  liningCost: number;
  hardwareCost: number;
  embroideryCost: number;
  extrasCost: number;
  totalPrice: number;
}

const BASE_PRICES: Record<string, number> = {
  "plecak-mama": 299,
  "plecak-dziecko": 199,
  "worek": 89,
  "torbacz-duza": 399,
  "torbacz-mala": 299,
  "kosmetyczka": 149,
  "torba-laptop": 349,
  "etui-laptop": 199,
};

const MATERIAL_COSTS: Record<string, number> = {
  "skora-czarna": 50,
  "skora-brazowa": 60,
  "skora-niebieska": 55,
  "skora-zielona": 55,
  "skora-czerwona": 65,
  "skora-rozowa": 70,
};

const LINING_COSTS: Record<string, number> = {
  "czerwona": 15,
  "niebieska": 15,
  "szara": 10,
  "zielona": 15,
  "rozowa": 20,
};

const HARDWARE_COSTS: Record<string, number> = {
  "zloty": 25,
  "srebrny": 20,
  "czarny": 15,
  "brazowy": 20,
};

const EMBROIDERY_COST_PER_CHAR = 2;
const EXTRA_COSTS: Record<string, number> = {
  "raczki-czarna-skora": 30,
  "raczki-brazowa-skora": 35,
  "kosmetyczka-rozmiar-S": 0,
  "kosmetyczka-rozmiar-M": 10,
  "kosmetyczka-rozmiar-L": 20,
};

export default function PriceCalculator() {
  let configurator;
  
  try {
    configurator = useConfigurator();
  } catch (error) {
    console.error('Error accessing configurator store:', error);
    return (
      <div className="bg-white rounded-2xl she-shadow-lg p-6">
        <h3 className="text-lg font-semibold text-she-dark mb-4">Kalkulator ceny</h3>
        <p className="text-she-primary text-center py-8">
          Błąd podczas ładowania konfiguratora
        </p>
      </div>
    );
  }
  
  // Destructure with safety checks
  const selectedProduct = configurator?.selectedProduct;
  const material = configurator?.material;
  const lining = configurator?.lining;
  const hardware = configurator?.hardware;
  const embroidery = configurator?.embroidery;
  const extras = configurator?.extras;

  // Early return if store is not ready or required properties are missing
  if (!configurator || !selectedProduct || !embroidery || !extras) {
    return (
      <div className="bg-white rounded-2xl she-shadow-lg p-6">
        <h3 className="text-lg font-semibold text-she-dark mb-4">Kalkulator ceny</h3>
        <p className="text-she-primary text-center py-8">
          Wybierz produkt, aby zobaczyć cenę
        </p>
      </div>
    );
  }

  const calculatePrice = (): PriceBreakdown => {
    // Additional safety check
    if (!selectedProduct || !embroidery || !extras) {
      return {
        basePrice: 0,
        materialCost: 0,
        liningCost: 0,
        hardwareCost: 0,
        embroideryCost: 0,
        extrasCost: 0,
        totalPrice: 0,
      };
    }

    const basePrice = BASE_PRICES[selectedProduct] || 0;
    const materialCost = material ? MATERIAL_COSTS[material] || 0 : 0;
    const liningCost = lining ? LINING_COSTS[lining] || 0 : 0;
    const hardwareCost = hardware ? HARDWARE_COSTS[hardware] || 0 : 0;
    
    const embroideryCost = (embroidery?.text || embroidery?.presetId) 
      ? (embroidery.text?.length || 0) * EMBROIDERY_COST_PER_CHAR 
      : 0;
    
    // Extra safety check for extras array
    let extrasCost = 0;
    try {
      if (Array.isArray(extras)) {
        // Filter out any invalid values
        const validExtras = extras.filter(extra => extra && typeof extra === 'string');
        
        extrasCost = validExtras.reduce((total, extra) => {
          // Additional safety check for extra key
          if (EXTRA_COSTS.hasOwnProperty(extra)) {
            return total + (EXTRA_COSTS[extra] || 0);
          }
          console.warn('Invalid extra key:', extra);
          return total;
        }, 0);
      }
    } catch (error) {
      console.error('Error calculating extras cost:', error);
      extrasCost = 0;
    }

    const totalPrice = basePrice + materialCost + liningCost + hardwareCost + embroideryCost + extrasCost;

    return {
      basePrice,
      materialCost,
      liningCost,
      hardwareCost,
      embroideryCost,
      extrasCost,
      totalPrice,
    };
  };

  const priceBreakdown = calculatePrice();

  return (
    <div className="bg-white rounded-2xl she-shadow-lg p-6">
      <h3 className="text-lg font-semibold text-she-dark mb-4">Kalkulator ceny</h3>
      
      {/* Total Price */}
      <div className="text-center mb-6 p-4 bg-she-light rounded-xl">
        <div className="text-2xl font-bold text-she-dark">
          {priceBreakdown.totalPrice} PLN
        </div>
        <div className="text-sm text-she-primary">Cena całkowita</div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-she-dark">Cena podstawowa</span>
          <span className="text-sm font-medium text-she-dark">{priceBreakdown.basePrice} PLN</span>
        </div>
        
        {priceBreakdown.materialCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-she-primary">Materiał</span>
            <span className="text-sm font-medium text-she-primary">+{priceBreakdown.materialCost} PLN</span>
          </div>
        )}
        
        {priceBreakdown.liningCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-she-primary">Podszewka</span>
            <span className="text-sm font-medium text-she-primary">+{priceBreakdown.liningCost} PLN</span>
          </div>
        )}
        
        {priceBreakdown.hardwareCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-she-primary">Okucia</span>
            <span className="text-sm font-medium text-she-primary">+{priceBreakdown.hardwareCost} PLN</span>
          </div>
        )}
        
        {priceBreakdown.embroideryCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-she-primary">Haft</span>
            <span className="text-sm font-medium text-she-primary">+{priceBreakdown.embroideryCost} PLN</span>
          </div>
        )}
        
        {priceBreakdown.extrasCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-she-primary">Dodatki</span>
            <span className="text-sm font-medium text-she-primary">+{priceBreakdown.extrasCost} PLN</span>
          </div>
        )}
      </div>

      {/* Savings indicator */}
      {priceBreakdown.totalPrice > priceBreakdown.basePrice && (
        <div className="mt-4 p-3 bg-she-success/10 rounded-xl text-center">
          <div className="text-sm text-she-success font-medium">
            Personalizacja: +{priceBreakdown.totalPrice - priceBreakdown.basePrice} PLN
          </div>
        </div>
      )}

      {/* Currency selector */}
      <div className="mt-6 pt-4 border-t border-she-secondary">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xs text-she-primary">Waluta:</span>
          <div className="flex space-x-1">
            {['PLN', 'EUR', 'USD'].map((currency) => (
              <button
                key={currency}
                className={`px-2 py-1 text-xs rounded ${
                  currency === 'PLN' 
                    ? 'bg-she-primary text-white' 
                    : 'bg-she-light text-she-primary hover:bg-she-secondary'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
