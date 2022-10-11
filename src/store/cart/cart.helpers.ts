import { CategoryItem } from "../categories/categories.types";
import { CartItem } from "./cart.types";

export const cartItemsIncremented = (cartItems: CartItem[], productToIncrement: CategoryItem): CartItem[] => {
    const foundItem = cartItems.find((item) => item.id === productToIncrement.id);
    if (foundItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToIncrement.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, { ...productToIncrement, quantity: 1 }]
}

export const cartItemsDecremented = (cartItems: CartItem[], itemToDecrement: CartItem): CartItem[] => {
    const foundItems = cartItems.find(item => item.id === itemToDecrement.id);
    if (foundItems && foundItems.quantity === 1) {
        return cartItemsDeleted(cartItems, itemToDecrement);
    }
    return cartItems.map(cartItem =>
        cartItem.id === itemToDecrement.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
}

export const cartItemsDeleted = (cartItems: CartItem[], itemToDelete: CartItem): CartItem[] => {
    return cartItems.filter(item => item.id !== itemToDelete.id);
}
