import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

const STORAGE_KEY = "mafiaGameState";

const loadState = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return { game: JSON.parse(raw) };
  } catch {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().game));
});

export default store;
