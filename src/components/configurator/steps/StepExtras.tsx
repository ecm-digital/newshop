"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";
import type { ExtraKey } from "@/types/configurator";

const EXTRA_LABELS: Record<ExtraKey, string> = {
  "raczki-czarna-skora": "Rączki - czarna skóra",
  "raczki-brazowa-skora": "Rączki - brązowa skóra",
  "pasek-czarna-skora": "Pasek - czarna skóra",
  "pasek-brazowa-skora": "Pasek - brązowa skóra",
  "kosmetyczka-rozmiar-S": "Rozmiar S",
  "kosmetyczka-rozmiar-M": "Rozmiar M",
  "kosmetyczka-rozmiar-L": "Rozmiar L",
};

const EXTRA_DESCRIPTIONS: Record<ExtraKey, string> = {
  "raczki-czarna-skora": "Eleganckie rączki z czarnej skóry naturalnej",
  "raczki-brazowa-skora": "Stylowe rączki z brązowej skóry naturalnej",
  "pasek-czarna-skora": "Pasek z czarnej skóry naturalnej",
  "pasek-brazowa-skora": "Pasek z brązowej skóry naturalnej",
  "kosmetyczka-rozmiar-S": "Mała kosmetyczka - idealna na podróż",
  "kosmetyczka-rozmiar-M": "Średnia kosmetyczka - uniwersalny rozmiar",
  "kosmetyczka-rozmiar-L": "Duża kosmetyczka - dla wszystkich kosmetyków",
};

const EXTRA_ICONS: Record<ExtraKey, string> = {
  "raczki-czarna-skora": "👜",
  "raczki-brazowa-skora": "👜",
  "pasek-czarna-skora": "💼",
  "pasek-brazowa-skora": "💼",
  "kosmetyczka-rozmiar-S": "💄",
  "kosmetyczka-rozmiar-M": "💄",
  "kosmetyczka-rozmiar-L": "💄",
};

export function StepExtras() {
  const { selectedProduct, extras, toggleExtra } = useConfigurator();
  const product = getProductConfig(selectedProduct);

  if (!product || product.extrasAllowed.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-6xl mb-6">🎯</div>
        <div className="text-2xl font-bold mb-3">Brak opcji dodatkowych</div>
        <div className="text-lg mb-4">Ten produkt nie ma dostępnych opcji dodatkowych</div>
        
        {/* Product-specific explanation */}
        <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-4 text-sm">
          {selectedProduct === 'worek' && (
            <div>
              <div className="font-medium text-gray-700 mb-2">💡 Dlaczego worek nie ma dodatków?</div>
              <div className="text-gray-600">
                Worek jest prostym, praktycznym produktem bez okuć i uchwytów. 
                Możesz go spersonalizować materiałem, podszewką i haftem.
              </div>
            </div>
          )}
          
          {selectedProduct === 'etui-laptop' && (
            <div>
              <div className="font-medium text-gray-700 mb-2">💡 Dlaczego etui nie ma dodatków?</div>
              <div className="text-gray-600">
                Etui na laptopa to kompaktowy produkt ochronny. 
                Możesz go spersonalizować materiałem, podszewką, okuciami i haftem.
              </div>
            </div>
          )}
          
          {selectedProduct && !['worek', 'etui-laptop'].includes(selectedProduct) && (
            <div>
              <div className="font-medium text-gray-700 mb-2">💡 Informacja</div>
              <div className="text-gray-600">
                Ten produkt nie ma skonfigurowanych opcji dodatkowych w systemie.
              </div>
            </div>
          )}
        </div>
        
        {/* Available customization options */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="text-sm font-medium text-gray-700 mb-2">✅ Dostępne opcje personalizacji:</div>
          <div className="space-y-1 text-xs text-gray-600">
            {product?.enabledSteps.material && <div>• Materiał</div>}
            {product?.enabledSteps.lining && <div>• Podszewka</div>}
            {product?.enabledSteps.hardware && <div>• Okucia</div>}
            {product?.enabledSteps.embroidery && <div>• Haft</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Opcje dodatkowe</h3>
        <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4">
          Wybierz dodatkowe elementy, które wzbogacą funkcjonalność Twojego produktu
        </p>
        
        {/* Product-specific extras info */}
        <div className="max-w-md mx-auto bg-she-light rounded-xl p-4 mb-6">
          <div className="text-sm text-she-dark">
            <div className="font-medium mb-2">📋 Dostępne dodatki dla {product.name}:</div>
            <div className="text-xs text-she-primary">
              {product.extrasAllowed.length === 1 
                ? '1 opcja dodatkowa' 
                : `${product.extrasAllowed.length} opcji dodatkowych`
              }
            </div>
            
            {/* Product-specific explanation */}
            {selectedProduct === 'plecak-mama' || selectedProduct === 'plecak-dziecko' ? (
              <div className="mt-2 text-xs text-she-primary">
                💡 Plecaki mogą mieć rączki w różnych kolorach skóry
              </div>
            ) : selectedProduct === 'torbacz-duza' || selectedProduct === 'torbacz-mala' ? (
              <div className="mt-2 text-xs text-she-primary">
                💡 Torby Torbacz mogą mieć rączki w różnych kolorach skóry
              </div>
            ) : selectedProduct === 'torba-laptop' ? (
              <div className="mt-2 text-xs text-she-primary">
                💡 Torby na laptopa mogą mieć rączki w różnych kolorach skóry
              </div>
            ) : selectedProduct === 'nerka' ? (
              <div className="mt-2 text-xs text-she-primary">
                💡 Nerki: dostępne paski ze skóry (różne kolory)
              </div>
            ) : selectedProduct === 'kosmetyczka' ? (
              <div className="mt-2 text-xs text-she-primary">
                💡 Kosmetyczki mogą mieć różne rozmiary (S, M, L)
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {product.extrasAllowed.map((extra) => (
          <button
            key={extra}
            onClick={() => toggleExtra(extra)}
            className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-xl ${
              extras.includes(extra) 
                ? "border-black bg-black/5 shadow-lg" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-xl"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">
                {EXTRA_ICONS[extra]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-xl mb-2">{EXTRA_LABELS[extra]}</div>
                <div className="text-sm text-gray-600">{EXTRA_DESCRIPTIONS[extra]}</div>
              </div>
              {extras.includes(extra) && (
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {extras.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-4 text-blue-800">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold mb-2">Wybrane opcje dodatkowe:</div>
              <div className="text-base">
                {extras.map(e => EXTRA_LABELS[e]).join(", ")}
              </div>
            </div>
          </div>
          
          {/* Additional info about selected extras */}
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="text-sm text-blue-700">
              <div className="font-medium mb-2">💡 Informacje o wybranych dodatkach:</div>
              <div className="space-y-1 text-xs">
                {extras.includes('raczki-czarna-skora') && (
                  <div>• Rączki z czarnej skóry naturalnej - elegancki wygląd</div>
                )}
                {extras.includes('raczki-brazowa-skora') && (
                  <div>• Rączki z brązowej skóry naturalnej - klasyczny styl</div>
                )}
                {extras.includes('kosmetyczka-rozmiar-S') && (
                  <div>• Rozmiar S - idealny na podróż z podstawowymi kosmetykami</div>
                )}
                {extras.includes('kosmetyczka-rozmiar-M') && (
                  <div>• Rozmiar M - uniwersalny rozmiar dla większości potrzeb</div>
                )}
                {extras.includes('kosmetyczka-rozmiar-L') && (
                  <div>• Rozmiar L - duża pojemność dla wszystkich kosmetyków</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {extras.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">💡</div>
          <div className="text-lg font-medium mb-2">Nie wybrano żadnych opcji dodatkowych</div>
          <div className="text-base mb-4">Kliknij na opcje powyżej, aby je dodać</div>
          
          {/* Available extras reminder */}
          <div className="max-w-md mx-auto bg-she-light rounded-xl p-4">
            <div className="text-sm text-she-dark">
              <div className="font-medium mb-2">🎯 Dostępne opcje:</div>
              <div className="space-y-1 text-xs text-she-primary">
                {product.extrasAllowed.includes('raczki-czarna-skora') && (
                  <div>• Rączki - czarna skóra naturalna</div>
                )}
                {product.extrasAllowed.includes('raczki-brazowa-skora') && (
                  <div>• Rączki - brązowa skóra naturalna</div>
                )}
                {product.extrasAllowed.includes('kosmetyczka-rozmiar-S') && (
                  <div>• Rozmiar S - mała kosmetyczka</div>
                )}
                {product.extrasAllowed.includes('kosmetyczka-rozmiar-M') && (
                  <div>• Rozmiar M - średnia kosmetyczka</div>
                )}
                {product.extrasAllowed.includes('kosmetyczka-rozmiar-L') && (
                  <div>• Rozmiar L - duża kosmetyczka</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
