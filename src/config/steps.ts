import { type StepKey, type StepDefinition, type ProductKey } from "@/types/configurator";
import { getProductConfig } from "@/config/products";

export const STEPS_ORDER: StepKey[] = [
  "product",
  "material",
  "lining",
  "hardware",
  "embroidery",
  "extras",
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
    key: "material",
    label: "Materiał",
    title: "Wybór materiału",
    description: "Wybierz materiał zewnętrzny produktu",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.material),
  },
  {
    key: "lining",
    label: "Podszewka",
    title: "Wybór podszewki",
    description: "Wybierz kolor i materiał podszewki",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.lining),
  },
  {
    key: "hardware",
    label: "Okucia/Zamek",
    title: "Wybór okuć",
    description: "Wybierz kolor okuć i zamka",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.hardware),
  },
  {
    key: "embroidery",
    label: "Haft",
    title: "Konfiguracja haftu",
    description: "Dodaj personalizowany haft lub wybierz gotowy wzór",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.embroidery),
  },
  {
    key: "extras",
    label: "Opcje dodatkowe",
    title: "Opcje dodatkowe",
    description: "Wybierz dodatkowe akcesoria i usługi",
    isEnabledFor: (product) => Boolean(product?.enabledSteps.extras),
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
