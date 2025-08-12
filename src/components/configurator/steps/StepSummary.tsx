"use client";
import React from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";

const MATERIAL_LABELS: Record<string, string> = {
  "ekoskora": "Ekoskóra",
  "sztruks": "Sztruks",
  "len-a": "Len — wzór A",
  "len-b": "Len — wzór B",
  "len-c": "Len — wzór C",
};

const LINING_LABELS: Record<string, string> = {
  "white": "Biały",
  "black": "Czarny",
};

const HARDWARE_LABELS: Record<string, string> = {
  "silver": "Srebrny",
  "gold": "Złoty",
};

const EXTRA_LABELS: Record<string, string> = {
  "raczki-czarna-skora": "Rączki - czarna skóra",
  "raczki-brazowa-skora": "Rączki - brązowa skóra",
  "pasek-czarna-skora": "Pasek - czarna skóra",
  "pasek-brazowa-skora": "Pasek - brązowa skóra",
  "kosmetyczka-rozmiar-S": "Rozmiar S",
  "kosmetyczka-rozmiar-M": "Rozmiar M",
  "kosmetyczka-rozmiar-L": "Rozmiar L",
};

export function StepSummary() {
  const { selectedProduct, material, lining, hardware, embroidery, extras, setStep } = useConfigurator();
  const product = getProductConfig(selectedProduct);

  if (!product) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-6xl mb-6">❌</div>
        <div className="text-2xl font-bold mb-3">Brak produktu</div>
        <div className="text-lg">Najpierw wybierz produkt</div>
      </div>
    );
  }

  const basePrice = 150; // Base price in PLN
  const materialPrice = material ? 20 : 0;
  const liningPrice = lining ? 15 : 0;
  const hardwarePrice = hardware ? 25 : 0;
  const embroideryPrice = embroidery.text || embroidery.presetId ? 30 : 0;
  const extrasPrice = extras.length * 15;
  const totalPrice = basePrice + materialPrice + liningPrice + hardwarePrice + embroideryPrice + extrasPrice;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Podsumowanie konfiguracji</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Sprawdź wszystkie wybory przed dodaniem do koszyka
        </p>
      </div>

      <div className="space-y-6">
        {/* Product */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-xl">Produkt</div>
              <div className="text-lg text-gray-600">{product.name}</div>
            </div>
          </div>
          <button
            onClick={() => setStep("product")}
            className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
          >
            Zmień
          </button>
        </div>

        {/* Material */}
        {material && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🧶</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xl">Materiał</div>
                <div className="text-lg text-gray-600">{MATERIAL_LABELS[material]}</div>
              </div>
            </div>
            <button
              onClick={() => setStep("material")}
              className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Zmień
            </button>
          </div>
        )}

        {/* Lining */}
        {lining && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔄</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xl">Podszewka</div>
                <div className="text-lg text-gray-600">{LINING_LABELS[lining]}</div>
              </div>
            </div>
            <button
              onClick={() => setStep("lining")}
              className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Zmień
            </button>
          </div>
        )}

        {/* Hardware */}
        {hardware && product.enabledSteps.hardware && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔧</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xl">Okucia i zamki</div>
                <div className="text-lg text-gray-600">{HARDWARE_LABELS[hardware]}</div>
              </div>
            </div>
            <button
              onClick={() => setStep("hardware")}
              className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Zmień
            </button>
          </div>
        )}

        {/* Embroidery */}
        {(embroidery.text || embroidery.presetId) && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-pink-50 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">✂️</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xl">Haft</div>
                <div className="text-lg text-gray-600">
                  {embroidery.mode === "custom" 
                    ? `"${embroidery.text}" (${embroidery.font}, ${embroidery.threadColor})`
                    : `Wzór: ${embroidery.presetId}`
                  }
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep("embroidery")}
              className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Zmień
            </button>
          </div>
        )}

        {/* Extras */}
        {extras.length > 0 && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xl">Opcje dodatkowe</div>
                <div className="text-lg text-gray-600">
                  {extras.map(e => EXTRA_LABELS[e]).join(", ")}
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep("extras")}
              className="text-lg text-blue-600 hover:text-blue-800 underline font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Zmień
            </button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Szczegóły ceny</h4>
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>Cena podstawowa</span>
            <span className="font-bold">{basePrice} PLN</span>
          </div>
          {materialPrice > 0 && (
            <div className="flex justify-between text-lg">
              <span>Materiał</span>
              <span className="font-bold text-green-600">+{materialPrice} PLN</span>
            </div>
          )}
          {liningPrice > 0 && (
            <div className="flex justify-between text-lg">
              <span>Podszewka</span>
              <span className="font-bold text-green-600">+{liningPrice} PLN</span>
            </div>
          )}
          {hardwarePrice > 0 && (
            <div className="flex justify-between text-lg">
              <span>Okucia i zamki</span>
              <span className="font-bold text-green-600">+{hardwarePrice} PLN</span>
            </div>
          )}
          {embroideryPrice > 0 && (
            <div className="flex justify-between text-lg">
              <span>Haft</span>
              <span className="font-bold text-green-600">+{embroideryPrice} PLN</span>
            </div>
          )}
          {extrasPrice > 0 && (
            <div className="flex justify-between text-lg">
              <span>Opcje dodatkowe</span>
              <span className="font-bold text-green-600">+{extrasPrice} PLN</span>
            </div>
          )}
          <div className="border-t-2 pt-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Cena końcowa</span>
              <span className="text-blue-600">{totalPrice} PLN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-6 pt-6">
        <button className="flex-1 h-16 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl font-bold hover:from-gray-800 hover:to-black transition-all shadow-xl hover:shadow-2xl text-lg">
          🛒 Dodaj do koszyka
        </button>
        <button className="h-16 px-10 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all font-bold text-lg">
          💾 Zapisz wersję
        </button>
      </div>
    </div>
  );
}
