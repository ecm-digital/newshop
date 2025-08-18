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
import { STEPS_ORDER, isStepEnabled } from "@/config/steps";
import { getProductConfig } from "@/config/products";

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
  // UI-only: which tab is active in configuration step
  configTab?: 'lining' | 'material' | 'hardware' | 'embroidery';
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
  setConfigTab: (t: 'lining' | 'material' | 'hardware' | 'embroidery') => void;
  // Template actions
  setSelectedProduct: (p: ProductKey) => void;
  setSelectedMaterial: (m: MaterialType) => void;
  setSelectedLining: (l: LiningColor) => void;
  setSelectedHardware: (h: HardwareColor) => void;
  setEmbroideryText: (text: string) => void;
  setSelectedExtras: (extras: ExtraKey[]) => void;
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
  configTab: 'lining',
};

export const useConfigurator = create<ConfiguratorStore>()((set, get) => ({
  ...initialState,
  setModel: (id) => set((state) => ({ model: id, extras: state.extras || [] })),
  setColor: (id) => set((state) => ({ color: id, extras: state.extras || [] })),
  setSize: (id) => set((state) => ({ size: id, extras: state.extras || [] })),
  toggleAddon: (id) =>
    set((state) => ({
      addons: state.addons.includes(id)
        ? state.addons.filter((a) => a !== id)
        : [...state.addons, id],
      extras: state.extras || []
    })),
  reset: () => set((state) => ({ ...initialState, extras: state.extras || [] })),
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
      extras: state.extras || [],
      // stay on current step; navigation happens via Next button
      step: state.step,
    })),
  setMaterialNew: (m) => set((state) => ({ material: m, extras: state.extras || [] })),
  setLining: (l) => set((state) => ({ lining: l, extras: state.extras || [] })),
  setHardware: (h) => set((state) => ({ hardware: h, extras: state.extras || [] })),
  setEmbroidery: (e) => set((state) => ({ 
    embroidery: { ...state.embroidery, ...e },
    extras: state.extras || []
  })),
  toggleExtra: (e) =>
    set((state) => ({
      extras: (state.extras || []).includes(e)
        ? (state.extras || []).filter((x) => x !== e)
        : [...(state.extras || []), e],
    })),
  setStep: (s) => set((state) => ({ step: s, extras: state.extras || [] })),
  // Template actions
  setSelectedProduct: (p) => set((state) => ({ selectedProduct: p, extras: state.extras || [] })),
  setSelectedMaterial: (m) => set((state) => ({ material: m, extras: state.extras || [] })),
  setSelectedLining: (l) => set((state) => ({ lining: l, extras: state.extras || [] })),
  setSelectedHardware: (h) => set((state) => ({ hardware: h, extras: state.extras || [] })),
  setEmbroideryText: (text) => set((state) => ({ 
    embroidery: { ...state.embroidery, text },
    extras: state.extras || []
  })),
  setSelectedExtras: (extras) => set((state) => ({ 
    extras: Array.isArray(extras) ? extras : (state.extras || [])
  })),
  setConfigTab: (t) => set(() => ({ configTab: t })),
  // Navigation helpers
  goToNextStep: () => {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    
    // Find next enabled step
    for (let i = currentIndex + 1; i < STEPS_ORDER.length; i++) {
      const nextStep = STEPS_ORDER[i];
      if (isStepEnabled(nextStep, state.selectedProduct)) {
        set({ step: nextStep, extras: state.extras || [] });
        return;
      }
    }
  },
  goToPreviousStep: () => {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    
    // Find previous enabled step
    for (let i = currentIndex - 1; i >= 0; i--) {
      const prevStep = STEPS_ORDER[i];
      if (isStepEnabled(prevStep, state.selectedProduct)) {
        set({ step: prevStep, extras: state.extras || [] });
        return;
      }
    }
  },
  goToStep: (s) => set((state) => ({ step: s, extras: state.extras || [] })),
  get canGoToNextStep() {
    const state = get();
    const currentIndex = STEPS_ORDER.indexOf(state.step);
    
    // Check if there's any enabled step after current
    const hasNextEnabledStep = STEPS_ORDER.slice(currentIndex + 1).some(step => 
      isStepEnabled(step, state.selectedProduct)
    );
    if (!hasNextEnabledStep) return false;
    
    // Check if current step is valid (only for enabled steps)
    if (!isStepEnabled(state.step, state.selectedProduct)) return true; // Skip disabled steps
    
    switch (state.step) {
      case "templates":
        return true; // Always can proceed from templates
      case "product":
        return state.selectedProduct !== null;
      case "material":
        return state.material !== null;
      case "lining":
        return state.material !== null;
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
    
    // If step is not enabled for current product, consider it valid (skipped)
    if (!isStepEnabled(s, state.selectedProduct)) {
      return true;
    }
    
    switch (s) {
      case "templates":
        return true; // Always valid
      case "product":
        return state.selectedProduct !== null;
      case "material":
        return state.material !== null;
      case "lining":
        return state.material !== null;
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
