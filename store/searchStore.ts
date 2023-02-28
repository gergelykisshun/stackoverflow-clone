import { create } from "zustand";

interface searchState {
  search: string;
  advancedSearchIsOpen: boolean;
}

interface searchActions {
  change: (search: string) => void;
  reset: () => void;
  toggleAdvancedSearch: () => void;
}

const initialState: searchState = {
  search: "",
  advancedSearchIsOpen: false,
};

export const useSearchStore = create<searchState & searchActions>()((set) => ({
  ...initialState,
  change: (search) => set((state) => ({ search })),
  reset: () => set(initialState),
  toggleAdvancedSearch: () =>
    set((state) => ({ advancedSearchIsOpen: !state.advancedSearchIsOpen })),
}));
