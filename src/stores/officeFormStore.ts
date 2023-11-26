import { create } from "zustand";

interface OfficeFormState {
  name: string;
  description: string;
  setName: (newName: string) => void;
  setDescription: (newDescription: string) => void;
  timezone: string;
  setTimezone: (newTimezone: string) => void;
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
  timezone: "Etc/GMT",
  setTimezone: (newTimezone) =>
    set((state) => {
      return { ...state, timezone: newTimezone };
    }),
  reset: () => set({ name: "", description: "" }),
}));
