import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["LoginReducer", "accessTokenReducer", "userInfoReducer"],
};

const enhanceReducer = persistReducer(persistConfig, rootReducer);

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store: any = createStore(
  enhanceReducer,
  devTools(applyMiddleware(thunk))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
