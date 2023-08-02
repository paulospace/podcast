import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { podcastStoreReducer } from "../features/podcastStore/podcastStoreSlice";
import { podcastLibraryReducer } from "../features/podcastLibrary/podcastLibrarySlice";
import persistReducer from "redux-persist/es/persistReducer";
import { storage } from "./db";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: storage(),
  blackList: ["podcastStore"],
};

const rootReducer = combineReducers({
  podcastStore: podcastStoreReducer,
  podcastLibrary: podcastLibraryReducer,
});

/* create a persist store so that the state is stored in a indexeddb*/
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    // need to check false on serializable check because of redux persist
    const middlewareConfig = {
      serializableCheck: false,
    };
    return getDefaultMiddleware(middlewareConfig);
  },
});

export const persistor = persistStore(store);
