import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { cartItemsDecremented, cartItemsDeleted, cartItemsIncremented } from "./cart.helpers";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));


export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = cartItemsIncremented(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const deleteItemFromCart = (cartItems: CartItem[], itemToDelete: CartItem) => {
    const newCartItems = cartItemsDeleted(cartItems, itemToDelete);
    return setCartItems(newCartItems);
}

export const decrementItem = (cartItems: CartItem[], itemToDecrement: CartItem) => {
    const newCartItems = cartItemsDecremented(cartItems, itemToDecrement);
    return setCartItems(newCartItems);
}

