"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { PRODUCTS } from "@/config/products";
import { Card, Badge } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";

const PRODUCT_ICONS: Record<string, string> = {
  "plecak-mama": "🎒",
  "plecak-dziecko": "🎒",
  "worek": "👜",
  "nerka": "🎒",
  "torba-duza": "🛍️",
  "torba-mala": "🛍️",
  "kosmetyczka": "💄",
  "torba-laptop": "💻",
  "etui-laptop": "💻",
};

export default function StepProduct() {
  const { selectedProduct, setProduct } = useConfigurator();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">
          Wybierz swoją torebkę
        </h3>
        <p className="text-gray-600 text-lg">Wybierz model torebki skórzanej SHE do personalizacji</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            onClick={() => setProduct(product.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setProduct(product.id); } }}
            tabIndex={0}
            role="button"
            aria-pressed={selectedProduct === product.id}
            className={`
              group relative cursor-pointer transition-all duration-300 hover-lift
              glass-strong rounded-3xl p-6 she-shadow-lg hover:she-shadow-glow
              ${selectedProduct === product.id 
                ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 she-shadow-glow scale-105' 
                : 'hover:bg-white/60 hover:scale-102'
              }
            `}
          >
            {/* Selected marker */}
            {selectedProduct === product.id && (
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full she-gradient-primary text-white flex items-center justify-center shadow-lg animate-pulse">
                <CheckIcon className="w-4 h-4" />
              </div>
            )}

            {/* Background gradient overlay */}
            <div className={`
              absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5
            `} />

            {/* Icon */}
            <div className="relative flex justify-center mb-6">
              <div               className={`
                h-20 w-20 rounded-3xl flex items-center justify-center text-5xl transition-all duration-300
                bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm
                group-hover:from-amber-100/60 group-hover:to-yellow-100/60
                she-shadow group-hover:she-shadow-warm group-hover:scale-110
                ${selectedProduct === product.id ? 'from-amber-100/80 to-yellow-100/80 scale-110' : ''}
              `}>
                {PRODUCT_ICONS[product.id]}
              </div>
            </div>

            {/* Name */}
            <div className="relative text-center mb-4">
              <h4 className="text-xl font-bold text-amber-900 mb-1 group-hover:text-amber-950">
                {product.name}
              </h4>
            </div>

            {/* Capabilities badges */}
            <div className="relative flex items-center justify-center gap-2 flex-wrap">
              {product.enabledSteps.embroidery && (
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full border border-orange-200/50">
                  ✨ Haft
                </span>
              )}
              {product.enabledSteps.hardware && (
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 rounded-full border border-slate-200/50">
                  🔧 Okucia
                </span>
              )}
              {product.extrasAllowed.length > 0 && (
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full border border-purple-200/50">
                  🎁 Dodatki
                </span>
              )}
            </div>

            {/* Hover indicator */}
            <div className={`
              absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-300
              ${selectedProduct === product.id 
                ? 'she-gradient-primary' 
                : 'bg-amber-300 group-hover:she-gradient-warm'
              }
            `} />
          </div>
        ))}
      </div>

      {/* Success Message */}
      {selectedProduct && (
        <div className="text-center p-6 glass rounded-3xl she-shadow-lg border border-amber-200/50 bg-gradient-to-r from-amber-50/80 to-yellow-50/80">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl she-gradient-warm text-white mb-3 she-shadow-glow">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-amber-900 mb-2">Doskonały wybór!</h4>
          <p className="text-amber-800 font-medium">
            Torebka <span className="font-bold">{PRODUCTS.find(p => p.id === selectedProduct)?.name}</span> została wybrana. 
            Przejdź do personalizacji swojej luksusowej torebki skórzanej SHE.
          </p>
        </div>
      )}
    </div>
  );
}
