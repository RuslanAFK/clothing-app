import { createAction } from "../../utils/reducer/reducer.utils";
import { cartItemsDecremented, cartItemsDeleted, cartItemsIncremented } from "./cart.helpers";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = cartItemsIncremented(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemFromCart = (cartItems, itemToDelete) => {
    const newCartItems = cartItemsDeleted(cartItems, itemToDelete);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const decrementItem = (cartItems, itemToDecrement) => {
    const newCartItems = cartItemsDecremented(cartItems, itemToDecrement);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

