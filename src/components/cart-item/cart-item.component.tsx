import { FC, memo } from 'react';
import { CartItem } from '../../store/cart/cart.types';
import './cart-item.styles.scss';

type CartItemProps = {
    item: CartItem;
}

const CartItemComponent: FC<CartItemProps> = memo(({ item }) => {
    return (
        <div className='cart-item-container'>
            <img src={item.imageUrl} alt={item.name} />
            <div className='item-details'>
                <span className='name'>{item.name}</span>
                <span className='price'>{item.quantity} x ${item.price}</span>
            </div>
        </div>
    )
})

export default CartItemComponent;