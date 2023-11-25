import { create } from "zustand";

export interface DeskFormState {
  id?: string;
  name?: string;
  publicDeskId: string;
  description?: string;
  x: number;
  y: number;
}

interface OfficeFloorFormState {
  name: string;
  description: string;
  desks: DeskFormState[];
  setName: (newName: string) => void;
  setDescription: (newDescription: string) => void;
  setDesks: (newDesks: DeskFormState[]) => void;
  reset: () => void;
  imageUrl?: string;
  setImageUrl: (newImageUrl: string) => void;
}

export const useOfficeFloorFormStore = create<OfficeFloorFormState>((set) => ({
  name: "",
  description: "",
  desks: [],
  setName: (newName) =>
    set((state) => {
      return { ...state, name: newName };
    }),
  setDescription: (newDescription) =>
    set((state) => {
      return { ...state, description: newDescription };
    }),
  setDesks: (newDesks) =>
    set((state) => {
      return { ...state, desks: newDesks };
    }),
  reset: () => set({ name: "", description: "" }),
  imageUrl: undefined,
  setImageUrl: (newImageUrl) =>
    set((state) => {
      return { ...state, imageUrl: newImageUrl };
    }),
}));
