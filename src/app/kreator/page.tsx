"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useConfigurator } from "@/store/configurator";
import type { ModelId, ColorId, AddonId } from "@/store/configurator";

type Step = "model" | "color" | "size" | "addons" | "summary";

const models: {
  id: ModelId;
  name: string;
  priceFrom: number;
  dimensions: string;
  sizeBadges?: string[];
  image: string;
}[] = [
  { id: "podkowka", name: "Podkówka (fason usztywniany)", priceFrom: 429, dimensions: "33 × 16 cm", sizeBadges: ["M", "L"], image: "/models/podkowka.jpg" },
  { id: "worek", name: "Worek (fason miękki)", priceFrom: 519, dimensions: "40 × 37 cm", sizeBadges: ["XL", "S"], image: "/models/worek.jpg" },
  { id: "plecak-west-l", name: "Plecak West L (nieprzemakalny)", priceFrom: 629, dimensions: "34 × 37 cm", sizeBadges: ["L"], image: "/models/plecak-west-l.jpg" },
  { id: "plecako-torba-2w1", name: "Plecako–Torba 2w1 (fason miękki)", priceFrom: 589, dimensions: "40 × 37 cm", sizeBadges: ["XL"], image: "/models/plecako-torba-2w1.jpg" },
  { id: "cuboid", name: "Cuboid (fason usztywniany)", priceFrom: 499, dimensions: "31 × 31 cm", sizeBadges: ["XL"], image: "/models/cuboid.jpg" },
  { id: "aktowka", name: "Aktówka (fason usztywniany)", priceFrom: 469, dimensions: "36 × 26 cm", sizeBadges: ["L"], image: "/models/aktowka.jpg" },
  { id: "sawana", name: "Sawana (fason usztywniany)", priceFrom: 599, dimensions: "45 × 35 cm", sizeBadges: ["Jeden rozmiar"], image: "/models/sawana.jpg" },
  { id: "cube", name: "Cube (fason miękki)", priceFrom: 429, dimensions: "40 × 41 cm", sizeBadges: ["XL"], image: "/models/cube.jpg" },
  { id: "nerka", name: "Nerka (fason usztywniany)", priceFrom: 329, dimensions: "22 × 11 cm", sizeBadges: ["Standard"], image: "/models/nerka.jpg" },
];

const colors: { id: ColorId; name: string; hex: string }[] = [
  { id: "black", name: "Czarny", hex: "#111111" },
  { id: "white", name: "Biały", hex: "#ffffff" },
  { id: "red", name: "Czerwony", hex: "#c1174f" },
];

const sizes = ["S", "M", "L", "XL"] as const;

const addons: { id: AddonId; name: string }[] = [
  { id: "gift", name: "Pakowanie na prezent" },
  { id: "engrave", name: "Grawer" },
  { id: "express", name: "Dostawa ekspresowa" },
];

export default function KreatorPage() {
  const [step, setStep] = useState<Step>("model");
  const {
    model,
    setModel,
    color,
    setColor,
    size,
    setSize,
    addons: selectedAddons,
    toggleAddon,
  } = useConfigurator();

  const canNext = useMemo(() => {
    if (step === "model") return !!model;
    if (step === "color") return !!color;
    if (step === "size") return !!size;
    return true;
  }, [step, model, color, size]);

  const currentStepIndex = useMemo(() => stepsOrder.indexOf(step), [step]);
  const isLast = currentStepIndex === stepsOrder.length - 1;

  function goNext() {
    if (!canNext) return;
    if (isLast) return setStep("summary");
    setStep(stepsOrder[currentStepIndex + 1]);
  }

  function goBack() {
    if (currentStepIndex <= 0) return;
    setStep(stepsOrder[currentStepIndex - 1]);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-3xl font-bold tracking-tight">Kreator produktu</h1>
      <p className="text-sm text-gray-500 mt-1">
        Skonfiguruj produkt krok po kroku i zobacz podsumowanie.
      </p>

      <Progress step={step} />

      <div className="mt-6 rounded-lg border p-4">
        {step === "model" && (
          <div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Wybierz rozmiar, a następnie dotknij produkt i rozpocznij konfigurację.
              </h2>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {models.map((m) => {
                const active = model === m.id;
                return (
                  <div
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setModel(m.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setModel(m.id);
                    }}
                    aria-selected={active}
                    className={`text-left group rounded-2xl overflow-hidden border bg-white transition hover:shadow-md focus:outline-none ${
                      active
                        ? "border-[#c1174f] ring-2 ring-[#c1174f]"
                        : "border-gray-200 focus:ring-2 focus:ring-black"
                    }`}
                  >
                    <div className="relative bg-[#eeedf0]">
                      {/* badges */}
                      {m.sizeBadges && m.sizeBadges.length > 0 && (
                        <div className="absolute left-3 top-3 flex gap-2 z-10">
                          {m.sizeBadges.map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center rounded-full bg-[#f5e6eb] text-[#c1174f] px-2 py-0.5 text-xs font-medium shadow-sm"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="relative aspect-[3/4] overflow-hidden min-h-[220px] sm:min-h-0">
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-5 sm:p-6 drop-shadow-md"
                          onError={(e) => {
                            // fallback: if local file missing, show placeholder
                            const target = e.target as HTMLImageElement;
                            if (target && target.src !== undefined) {
                              target.src = "https://placehold.co/600x800?text=" + encodeURIComponent(m.name);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="px-4 pt-2 pb-4">
                      <div className="text-[#c1174f] text-xs sm:text-xs font-medium">{m.dimensions}</div>
                      <div className="mt-1 font-semibold leading-snug text-base sm:text-base">{m.name}</div>
                      <div className="text-sm sm:text-sm text-gray-600">od {m.priceFrom} zł</div>
                      {active && (
                        <div className="mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStep("color");
                            }}
                            className="w-full h-11 sm:h-10 rounded-full bg-[#c1174f] text-white text-sm sm:text-sm font-medium hover:brightness-95 transition"
                          >
                            Konfiguruj
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === "color" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left side: back link, sections, preview */}
            <div className="lg:col-span-7 bg-[#eeedf0] rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <button
                  onClick={() => setStep("model")}
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <span aria-hidden>←</span> Powrót do wyboru modelu
                </button>
                <button className="hover:underline">Zmień rozmiar</button>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6">
                {/* Sections menu */}
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-2 sm:mx-0 px-2 sm:px-0">
                  {[
                    { key: "extra", label: "Opcje dodatkowe" },
                    { key: "top", label: "Wierzch", active: true },
                    { key: "straps", label: "Paski" },
                    { key: "inside", label: "Wnętrze" },
                  ].map((s) => (
                    <button
                      key={s.key}
                      className={`inline-flex shrink-0 items-center rounded-full px-5 h-10 sm:h-9 border text-sm ${
                        s.active
                          ? "border-[#c1174f] text-[#c1174f]"
                          : "border-gray-300 hover:bg-white/40"
                      }`}
                    >
                      <span
                        className={`mr-2 inline-block h-3 w-3 sm:h-2.5 sm:w-2.5 rounded-full border ${
                          s.active ? "bg-[#c1174f] border-[#c1174f]" : "border-gray-400"
                        }`}
                      />
                      {s.label}
                    </button>
                  ))}
                </div>
                {/* Preview */}
                <div className="relative rounded-xl bg-[#eeedf0] flex items-center justify-center">
                  <div className="relative aspect-[3/2] w-full max-w-[560px] min-h-[220px] sm:min-h-0">
                    <Image
                      src={"/models/podkowka.jpg"}
                      alt="Podgląd produktu"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 560px"
                      className="object-contain p-5 sm:p-6 drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Right side: panel */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-xl font-semibold leading-tight">
                    {models.find((m) => m.id === model)?.name} {" "}
                  </h3>
                  <div className="text-sm text-gray-600">
                    od {models.find((m) => m.id === model)?.priceFrom ?? "-"} zł
                  </div>
                </div>
                <button
                  disabled={!color}
                  onClick={() => setStep("size")}
                  className="rounded-full bg-[#c1174f] text-white h-11 sm:h-10 px-6 text-sm font-medium disabled:opacity-50"
                >
                  Gotowe
                </button>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button className="p-3 sm:p-2 hover:bg-gray-100 rounded-full" aria-label="prev">‹</button>
                <div className="text-sm sm:text-base font-medium">Wierzch</div>
                <button className="p-3 sm:p-2 hover:bg-gray-100 rounded-full" aria-label="next">›</button>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: "korpus", label: "Korpus" },
                  { key: "klapa", label: "Klapa" },
                  { key: "zamek", label: "Zamek" },
                ].map((part) => (
                  <div key={part.key} className="rounded-2xl border border-gray-200 p-3 sm:p-3">
                    <div className="aspect-[4/3] bg-[#f6f6f6] rounded-lg" />
                    <div className="mt-2 flex items-center justify-between text-sm sm:text-sm">
                      <span className="font-medium">{part.label}</span>
                      <span className="text-[#c1174f]">✓</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Color swatches */}
              <div className="mt-6">
                <div className="text-sm text-gray-600 mb-2">Kolory</div>
                <div className="grid grid-cols-6 gap-3">
                  {colors.map((c) => {
                    const active = color === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        className={`rounded-xl border p-2 sm:p-2 flex items-center justify-center ${
                          active ? "border-[#c1174f] ring-2 ring-[#c1174f]" : "border-gray-200"
                        }`}
                        aria-pressed={active}
                      >
                        <span
                          className="block h-9 w-9 sm:h-7 sm:w-7 rounded-full border"
                          style={{ backgroundColor: c.hex, borderColor: c.id === "white" ? "#e5e7eb" : "transparent" }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "size" && (
          <div>
            <h2 className="text-xl font-semibold">Wybierz rozmiar</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md border transition ${
                    size === s ? "border-black ring-2 ring-black" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "addons" && (
          <div>
            <h2 className="text-xl font-semibold">Dodatki</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {addons.map((a) => (
                <label
                  key={a.id}
                  className={`border rounded-md p-3 cursor-pointer transition ${
                    selectedAddons.includes(a.id)
                      ? "border-black ring-2 ring-black"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(a.id)}
                    onChange={() => toggleAddon(a.id)}
                    className="mr-2"
                  />
                  {a.name}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === "summary" && (
          <div>
            <h2 className="text-xl font-semibold">Podsumowanie</h2>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <span className="font-medium">Model:</span> {model ?? "-"}
              </li>
              <li>
                <span className="font-medium">Kolor:</span> {color ?? "-"}
              </li>
              <li>
                <span className="font-medium">Rozmiar:</span> {size ?? "-"}
              </li>
              <li>
                <span className="font-medium">Dodatki:</span> {selectedAddons.length > 0 ? selectedAddons.join(", ") : "-"}
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => alert("Dodano do koszyka (mock)")}
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900"
              >
                Dodaj do koszyka
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentStepIndex <= 0}
          className="px-4 py-2 rounded-md border disabled:opacity-50"
        >
          Wstecz
        </button>
        {step !== "summary" ? (
          <button
            onClick={goNext}
            disabled={!canNext}
            className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-50"
          >
            Dalej
          </button>
        ) : (
          <button
            onClick={() => setStep("model")}
            className="px-4 py-2 rounded-md border"
          >
            Edytuj konfigurację
          </button>
        )}
      </div>
    </div>
  );
}

const stepsOrder: Step[] = ["model", "color", "size", "addons", "summary"];

function Progress({ step }: { step: Step }) {
  const index = stepsOrder.indexOf(step);
  return (
    <ol className="mt-6 flex items-center gap-2 text-xs">
      {stepsOrder.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
              i <= index ? "bg-black text-white border-black" : "border-gray-300 text-gray-600"
            }`}
          >
            {i + 1}
          </span>
          <span className={`${i <= index ? "font-medium" : "text-gray-500"}`}>
            {labelForStep(s)}
          </span>
          {i < stepsOrder.length - 1 && <span className="mx-2 text-gray-400">→</span>}
        </li>
      ))}
    </ol>
  );
}

function labelForStep(s: Step) {
  switch (s) {
    case "model":
      return "Model";
    case "color":
      return "Kolor";
    case "size":
      return "Rozmiar";
    case "addons":
      return "Dodatki";
    case "summary":
      return "Podsumowanie";
    default:
      return s;
  }
}
