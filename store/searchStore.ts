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

const useSearchStore = create<searchState & searchActions>()((set) => ({
  ...initialState,
  change: (search) => set((state) => ({ search })),
  reset: () => set(initialState),
}));
