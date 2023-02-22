import { PaletteMode } from "@mui/material";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  mode: PaletteMode;
}

interface Actions {
  setMode: () => void;
}

const initialState: State = {
  mode: "light",
};

export const useThemeStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      setMode: () => {
        set(() => {
          const currentMode = get().mode;
          return { mode: currentMode === "light" ? "dark" : "light" };
        });
      },
    }),
    {
      name: "user-selected-theme",
    }
  )
);
