import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    chat: chatReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
