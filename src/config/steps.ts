import { type StepKey, type StepDefinition, type ProductKey } from "@/types/configurator";
import { getProductConfig } from "@/config/products";

export const STEPS_ORDER: StepKey[] = [
  "product",
  "lining",
  "summary",
];

export const STEPS: StepDefinition[] = [
  {
    key: "product",
    label: "Produkt",
    title: "Wybór produktu",
    description: "Wybierz produkt, który chcesz spersonalizować",
    isEnabledFor: () => true,
  },
  {
    key: "lining",
    label: "Konfiguracja",
    title: "Konfiguracja materiału, podszewki, okuć i haftu",
    description: "Dobierz podszewkę, materiał, (dla wybranych produktów) okucia oraz ustaw haft",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.lining),
  },
  {
    key: "summary",
    label: "Podsumowanie",
    title: "Podsumowanie",
    description: "Sprawdź konfigurację i złóż zamówienie",
    isEnabledFor: () => true,
  },
];

export function isStepEnabled(step: StepKey, productKey: string | null) {
  const product = getProductConfig(productKey as ProductKey | null);
  const def = STEPS.find((s) => s.key === step);
  if (!def) return false;
  return def.isEnabledFor(product);
}
