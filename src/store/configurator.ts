import { create } from "zustand";
import type {
  StepKey,
  ProductKey,
  MaterialType,
  LiningColor,
  HardwareColor,
  EmbroideryState,
  ExtraKey,
} from "@/types/configurator";
import { STEPS_ORDER } from "@/config/steps";

export type Step = "model" | "color" | "size" | "addons" | "summary";

export type ModelId =
  | "podkowka"
  | "worek"
  | "plecak-west-l"
  | "plecako-torba-2w1"
  | "cuboid"
  | "aktowka"
  | "sawana"
  | "cube"
  | "nerka"
  // legacy demo ids kept for compatibility
  | "basic"
  | "premium"
  | "pro";
export type ColorId = "black" | "white" | "red";
export type SizeId = "S" | "M" | "L" | "XL";
export type AddonId = "gift" | "engrave" | "express";

export type Config = {
  // legacy/demo fields (used by current UI)
  model: ModelId | null;
  color: ColorId | null;
  size: SizeId | null;
  addons: AddonId[];
  // PRD fields
  selectedProduct: ProductKey | null;
  material: MaterialType | null;
  lining: LiningColor | null;
  hardware: HardwareColor | null;
  embroidery: EmbroideryState;
  extras: ExtraKey[];
  step: StepKey;
};

export type ConfiguratorStore = Config & {
  // actions
  setModel: (id: ModelId) => void;
  setColor: (id: ColorId) => void;
  setSize: (id: SizeId) => void;
  toggleAddon: (id: AddonId) => void;
  reset: () => void;
  // derived helpers
  isComplete: () => boolean;
  // PRD actions
  setProduct: (p: ProductKey) => void;
  setMaterialNew: (m: MaterialType) => void;
  setLining: (l: LiningColor) => void;
  setHardware: (h: HardwareColor) => void;
  setEmbroidery: (e: Partial<EmbroideryState>) => void;
  toggleExtra: (e: ExtraKey) => void;
  setStep: (s: StepKey) => void;
  // Navigation helpers
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (s: StepKey) => void;
  canGoToNextStep: boolean;
  isStepValid: (s: StepKey) => boolean;
};

const initialState: Config = {
  // legacy
  model: null,
  color: null,
  size: null,
  addons: [],
  // PRD
  selectedProduct: null,
  material: null,
  lining: null,
  hardware: null,
  embroidery: {
    mode: "custom",
    text: "",
    font: "sans",
    size: 16,
    threadColor: "black",
    presetId: null,
  },
  extras: [],
  step: "product",
};

export const useConfigurator = create<ConfiguratorStore>()((set, get) => ({
  ...initialState,
  setModel: (id) => set({ model: id }),
  setColor: (id) => set({ color: id }),
  setSize: (id) => set({ size: id }),
  toggleAddon: (id) =>
    set((state) => ({
      addons: state.addons.includes(id)
        ? state.addons.filter((a) => a !== id)
        : [...state.addons, id],
    })),
  reset: () => set(initialState),
  isComplete: () => {
    const s = get();
    return Boolean(s.model && s.color && s.size);
  },
  // PRD actions
  setProduct: (p) =>
    set((state) => ({
      selectedProduct: p,
      // reset dependent selections when product changes
      material: null,
      lining: null,
      hardware: null,
      embroidery: { ...state.embroidery, text: "", presetId: null },
      extras: [],
      step: "material",
    })),
  setMaterialNew: (m) => set({ material: m }),
  setLining: (l) => set({ lining: l }),
  setHardware: (h) => set({ hardware: h }),
  setEmbroidery: (e) => set((state) => ({ embroidery: { ...state.embroidery, ...e } })),
  toggleExtra: (e) =>
    set((state) => ({
      extras: state.extras.includes(e)
        ? state.extras.filter((x) => x !== e)
        : [...state.extras, e],
    })),
  setStep: (s) => set({ step: s }),
  // Navigation helpers
  goToNextStep: () => {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    if (currentIndex < STEPS_ORDER.length - 1) {
      set({ step: STEPS_ORDER[currentIndex + 1] });
    }
  },
  goToPreviousStep: () => {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    if (currentIndex > 0) {
      set({ step: STEPS_ORDER[currentIndex - 1] });
    }
  },
  goToStep: (s) => set({ step: s }),
  get canGoToNextStep() {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    if (currentIndex >= STEPS_ORDER.length - 1) return false;
    
    // Check if current step is valid
    switch (state.step) {
      case "product":
        return state.selectedProduct !== null;
      case "material":
        return state.material !== null;
      case "lining":
        return state.lining !== null;
      case "hardware":
        return state.hardware !== null;
      case "embroidery":
        return true; // Optional step
      case "extras":
        return true; // Optional step
      case "summary":
        return false; // Last step
      default:
        return false;
    }
  },
  isStepValid: (s: StepKey) => {
    const state = get();
    switch (s) {
      case "product":
        return state.selectedProduct !== null;
      case "material":
        return state.material !== null;
      case "lining":
        return state.lining !== null;
      case "hardware":
        return state.hardware !== null;
      case "embroidery":
        return true; // Optional step
      case "extras":
        return true; // Optional step
      case "summary":
        return true; // Always valid if we can reach it
      default:
        return true;
    }
  },
}));
