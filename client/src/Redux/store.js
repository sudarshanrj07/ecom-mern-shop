import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productListReducer, productReducer } from "./Reducers/Product";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./Reducers/User";
const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const rootReducer = combineReducers({
	productListReducer,
	productReducer,
	userLoginReducer,
	userRegisterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
