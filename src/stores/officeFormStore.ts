import { create } from "zustand";

interface OfficeFormState {
  name: string;
  description: string;
  setName: (newName: string) => void;
  setDescription: (newDescription: string) => void;
  reset: () => void;
}

export const useOfficeFormStore = create<OfficeFormState>((set) => ({
  name: "",
  description: "",
  setName: (newName) =>
    set((state) => {
      return { ...state, name: newName };
    }),
  setDescription: (newDescription) =>
    set((state) => {
      return { ...state, description: newDescription };
    }),
  reset: () => set({ name: "", description: "" }),
}));
