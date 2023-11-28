import { create } from "zustand";

interface MenuState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (newIsSidebarOpen: boolean) => void;
  isOfficeSelectorOpen: boolean;
  setIsOfficeSelectorOpen: (newIsOfficeSelectorOpen: boolean) => void;
  isOfficeSelectorHighlighted: boolean;
  setIsOfficeSelectorHighlighted: (
    newIsOfficeSelectorHighlighted: boolean,
  ) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (newIsSidebarOpen) =>
    set((state) => {
      return { ...state, isSidebarOpen: newIsSidebarOpen };
    }),
  isOfficeSelectorOpen: false,
  setIsOfficeSelectorOpen: (newIsOfficeSelectorOpen) =>
    set((state) => {
      return { ...state, isOfficeSelectorOpen: newIsOfficeSelectorOpen };
    }),
  isOfficeSelectorHighlighted: false,
  setIsOfficeSelectorHighlighted: (newIsOfficeSelectorHighlighted) =>
    set((state) => {
      return {
        ...state,
        isOfficeSelectorHighlighted: newIsOfficeSelectorHighlighted,
      };
    }),
}));
