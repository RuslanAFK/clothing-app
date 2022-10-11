import './cart-dropdown.styles.scss';

import Button from '../button/button.component';
import CartItemComponent from '../cart-item/cart-item.component';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selectors';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            {cartItems.length === 0 && <h2>The cart is empty</h2>}

            <div className='cart-items'>
                {cartItems.map(item => {
                    return (<CartItemComponent key={item.id} item={item} />)
                })}
            </div>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    )
}

export default CartDropdown;