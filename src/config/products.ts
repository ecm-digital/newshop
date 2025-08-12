import { type ProductConfig, type ProductKey, type ExtraKey } from "@/types/configurator";

// Allowed extras shortcuts
const RACZKI: ExtraKey[] = ["raczki-czarna-skora", "raczki-brazowa-skora"];
const KOSMETYCZKA_ROZMIARY: ExtraKey[] = [
  "kosmetyczka-rozmiar-S",
  "kosmetyczka-rozmiar-M",
  "kosmetyczka-rozmiar-L",
];

export const PRODUCTS: ProductConfig[] = [
  {
    id: "plecak-mama",
    name: "Plecak dla Mamy",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 16,
    extrasAllowed: [...RACZKI],
  },
  {
    id: "plecak-dziecko",
    name: "Plecak dla Dziecka",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 12,
    extrasAllowed: [...RACZKI],
  },
  {
    id: "worek",
    name: "Worek",
    enabledSteps: { material: true, lining: true, hardware: false, embroidery: true, extras: false },
    embroideryMaxChars: 14,
    extrasAllowed: [],
  },
  {
    id: "torbacz-duza",
    name: "Duża torba Torbacz Mamy",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 18,
    extrasAllowed: [...RACZKI],
  },
  {
    id: "torbacz-mala",
    name: "Mała torba Torbacz Mamy",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 16,
    extrasAllowed: [...RACZKI],
  },
  {
    id: "kosmetyczka",
    name: "Kosmetyczka",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 10,
    extrasAllowed: [...KOSMETYCZKA_ROZMIARY],
  },
  {
    id: "torba-laptop",
    name: "Torba na laptopa",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: true },
    embroideryMaxChars: 14,
    extrasAllowed: [...RACZKI],
  },
  {
    id: "etui-laptop",
    name: "Etui na laptopa",
    enabledSteps: { material: true, lining: true, hardware: true, embroidery: true, extras: false },
    embroideryMaxChars: 12,
    extrasAllowed: [],
  },
];

export function getProductConfig(key: ProductKey | null) {
  if (!key) return null;
  return PRODUCTS.find((p) => p.id === key) ?? null;
}
