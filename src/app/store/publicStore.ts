import { configureStore } from "@reduxjs/toolkit";
import { heroReducer } from "../../features/hero/model/Slice";

export const publicStore = configureStore({
  reducer: {
    hero: heroReducer,
  },
});
