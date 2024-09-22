import { create } from "zustand";

type OfficeFloorDeskFormStoreState = {
  id: string;
  name?: string;
  description?: string;
  setId: (id: string) => void;
  setName: (name: string | null) => void;
  setDescription: (description: string | null) => void;
};

export const useOfficeFloorDeskFormStore =
  create<OfficeFloorDeskFormStoreState>((set) => ({
    id: "",
    name: "",
    description: "",
    setId: (id: string) => set({ id }),
    setName: (name: string | null) => {
      if (!name) {
        return;
      }
      set({ name });
    },
    setDescription: (description: string | null) => {
      if (!description) {
        return;
      }
      set({ description });
    },
  }));
