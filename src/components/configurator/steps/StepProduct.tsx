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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-she-dark tracking-tight">
          Wybierz produkt
        </h3>
        <p className="mt-1 text-sm text-she-primary">Kliknij kartę poniżej, aby kontynuować</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            onClick={() => setProduct(product.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setProduct(product.id); } }}
            tabIndex={0}
            role="button"
            aria-pressed={selectedProduct === product.id}
            className={`group relative cursor-pointer transition-all border border-she-secondary/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 hover:shadow-xl hover:-translate-y-0.5 ${selectedProduct === product.id ? 'ring-2 ring-amber-700 shadow-xl' : 'shadow-md'}`}
          >
            {/* Selected marker */}
            {selectedProduct === product.id && (
              <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-sm">
                <CheckIcon />
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center">
              <div className="mb-4 h-16 w-16 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white flex items-center justify-center text-4xl shadow-sm group-hover:from-amber-100">
                {PRODUCT_ICONS[product.id]}
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <h4 className="text-base font-semibold text-she-dark">
                {product.name}
              </h4>
            </div>

            {/* Small capabilities badges (minimal) */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {product.enabledSteps.embroidery && (
                <Badge variant="soft" color="orange" radius="full" className="text-xs">Haft</Badge>
              )}
              {product.enabledSteps.hardware && (
                <Badge variant="soft" color="bronze" radius="full" className="text-xs">Okucia</Badge>
              )}
              {product.extrasAllowed.length > 0 && (
                <Badge variant="soft" color="gray" radius="full" className="text-xs">Dodatki</Badge>
              )}
            </div>
          </Card>
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
