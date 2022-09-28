export const cartItemsIncremented = (cartItems, productToIncrement) => {
    const foundItem = cartItems.find((item) => item.id === productToIncrement.id);
    if (foundItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToIncrement.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, { ...productToIncrement, quantity: 1 }]
}

export const cartItemsDecremented = (cartItems, itemToDecrement) => {
    if (cartItems.find(item => item.id === itemToDecrement.id).quantity === 1) {
        return cartItemsDeleted(cartItems, itemToDecrement);
    }
    return cartItems.map(cartItem =>
        cartItem.id === itemToDecrement.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
}

export const cartItemsDeleted = (cartItems, itemToDelete) => {
    return cartItems.filter(item => item.id !== itemToDelete.id);
}
