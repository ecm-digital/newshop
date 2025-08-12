"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { PRODUCTS } from "@/config/products";

const PRODUCT_ICONS: Record<string, string> = {
  "plecak-mama": "🎒",
  "plecak-dziecko": "🎒",
  "worek": "👜",
  "torba-duza": "🛍️",
  "torba-mala": "🛍️",
  "kosmetyczka": "💄",
  "torba-laptop": "💻",
  "etui-laptop": "💻",
};

export default function StepProduct() {
  const { selectedProduct, setProduct } = useConfigurator();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-she-dark mb-2">
          Wybierz produkt do personalizacji
        </h3>
        <p className="text-sm text-she-primary">
          Każdy produkt ma różne opcje konfiguracji
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => setProduct(product.id)}
            className={`
              p-4 rounded-xl transition-all duration-200 text-left she-shadow hover:she-shadow-lg
              ${selectedProduct === product.id
                ? 'border-2 border-she-primary bg-she-primary/5 she-shadow-lg'
                : 'border border-she-secondary bg-white hover:border-she-primary hover:bg-she-light'
              }
            `}
          >
            {/* Product Icon */}
            <div className="text-3xl mb-3 text-center">
              {PRODUCT_ICONS[product.id]}
            </div>

            {/* Product Info */}
            <div className="space-y-1.5">
              <h4 className="text-lg font-medium text-she-dark">
                {product.name}
              </h4>
              
              {/* Features */}
              <div className="space-y-1">
                {product.embroideryMaxChars > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-she-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Haft do {product.embroideryMaxChars} znaków
                  </div>
                )}
                
                {product.extrasAllowed.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-she-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {product.extrasAllowed.length} opcji dodatkowych
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Success Message */}
      {selectedProduct && (
        <div className="text-center p-4 bg-she-success/10 border border-she-success/20 rounded-xl">
          <p className="text-she-success font-medium">
            ✓ Produkt wybrany! Możesz przejść do następnego kroku.
          </p>
        </div>
      )}
    </div>
  );
}
