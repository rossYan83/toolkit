import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import contactsReducer from "./contactsSlice";
import filterReducer from "./filterSlice";

const contactsPersistConfig = {
  key: "contacts",
  storage,
  migrate: (state) => {
    if (Array.isArray(state?.items)) {
      return Promise.resolve({ items: state.items });
    }

    const indexes = Array.isArray(state)
      ? state
      : Object.keys(state ?? {})
          .filter((key) => /^\d+$/.test(key))
          .sort((a, b) => Number(a) - Number(b))
          .map((index) => state[index]);

    return Promise.resolve({ items: indexes });
  },
};

const rootReducer = combineReducers({
  contacts: persistReducer(contactsPersistConfig, contactsReducer),
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);