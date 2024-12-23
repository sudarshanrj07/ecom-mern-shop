import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ProductListReducer, ProductReducer } from "./Reducers/Product";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const rootReducer = combineReducers({
	ProductListReducer,
	ProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
