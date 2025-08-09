import { create } from "zustand";

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
  model: ModelId | null;
  color: ColorId | null;
  size: SizeId | null;
  addons: AddonId[];
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
};

const initialState: Config = {
  model: null,
  color: null,
  size: null,
  addons: [],
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
}));
