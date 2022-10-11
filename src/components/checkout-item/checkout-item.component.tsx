import { useDispatch, useSelector } from 'react-redux';

import './checkout-item.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { addItemToCart, decrementItem, deleteItemFromCart } from '../../store/cart/cart.actions';
import { CartItem } from '../../store/cart/cart.types';
import { FC } from 'react';

type CheckoutItemProps = {
    item: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ item }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price, quantity } = item;

    const deleteHandler = () => {
        dispatch(deleteItemFromCart(cartItems, item));
    }

    const incrementHandler = () => {
        dispatch(addItemToCart(cartItems, item));
    }

    const decrementHandler = () => {
        dispatch(decrementItem(cartItems, item));
    }

    return (
        <div className='checkout-item-container'>
            <div className='imahe-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={decrementHandler} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={incrementHandler} className='arrow'>&#10095;</div>
            </span>

            <span className='price'>{price}</span>
            <div className='remove-button' onClick={deleteHandler}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;