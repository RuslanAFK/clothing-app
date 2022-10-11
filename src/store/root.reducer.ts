import { cartReducer } from './cart/cart.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { userReducer } from './user/user.reducer';
import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

