// Domain types for PRD-driven Configurator
// Central place for step names and allowed values

export type StepKey =
  | "product"
  | "material"
  | "lining"
  | "hardware"
  | "embroidery"
  | "extras"
  | "summary";

export type ProductKey =
  | "plecak-mama"
  | "plecak-dziecko"
  | "worek"
  | "torbacz-duza"
  | "torbacz-mala"
  | "kosmetyczka"
  | "torba-laptop"
  | "etui-laptop";

export type CosmeticBagSize = "S" | "M" | "L";

export type MaterialType = "ekoskora" | "sztruks" | "len-a" | "len-b" | "len-c";
export type LiningColor = "white" | "black";
export type HardwareColor = "silver" | "gold";

export type EmbroideryMode = "custom" | "preset";
export type EmbroideryFont = "sans" | "serif" | "script"; // placeholder fonts for MVP
export type ThreadColor = "black" | "white" | "gold" | "silver" | "red" | "blue";

export type EmbroideryPresetId =
  | "heart"
  | "star"
  | "smile"
  | "alphabet-initial"; // MVP preset examples

export type ExtraKey =
  | "raczki-czarna-skora"
  | "raczki-brazowa-skora"
  | "pasek-czarna-skora"
  | "pasek-brazowa-skora"
  | "kosmetyczka-rozmiar-S"
  | "kosmetyczka-rozmiar-M"
  | "kosmetyczka-rozmiar-L";

export type ProductConfig = {
  id: ProductKey;
  name: string;
  // which steps are enabled
  enabledSteps: {
    material: boolean;
    lining: boolean;
    hardware: boolean; // skip for worek
    embroidery: boolean;
    extras: boolean;
  };
  embroideryMaxChars: number; // per PRD
  extrasAllowed: ExtraKey[]; // constrain extras list per product
  // optional sub-variant for MVP (e.g., cosmetic bag size handled in extras)
};

export type StepDefinition = {
  key: StepKey;
  label: string;
  title: string;
  description: string;
  isEnabledFor: (product: ProductConfig | null) => boolean;
};

export type EmbroideryState = {
  mode: EmbroideryMode;
  text: string; // when mode = custom
  font: EmbroideryFont;
  size: number; // px or abstract unit
  threadColor: ThreadColor;
  presetId: EmbroideryPresetId | null; // when mode = preset
};

export type ConfigState = {
  // primary selection
  selectedProduct: ProductKey | null;
  material: MaterialType | null;
  lining: LiningColor | null;
  hardware: HardwareColor | null;
  embroidery: EmbroideryState;
  extras: ExtraKey[];
  // step control
  step: StepKey;
};
