import { create } from "zustand";

interface searchState {
  search: string;
}

interface searchActions {
  change: (search: string) => void;
  reset: () => void;
}

const initialState: searchState = {
  search: "",
};

export const useSearchStore = create<searchState & searchActions>()((set) => ({
  ...initialState,
  change: (search) => set((state) => ({ search })),
  reset: () => set(initialState),
}));
