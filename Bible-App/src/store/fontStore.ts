import { create } from "zustand";

type FontStore = {
  size: number;
  increase: () => void;
  decrease: () => void;
};

export const useFont = create<FontStore>((set) => ({
  size: 16,
  increase: () => set((s) => ({ size: s.size + 2 })),
  decrease: () => set((s) => ({ size: s.size - 2 })),
}));
