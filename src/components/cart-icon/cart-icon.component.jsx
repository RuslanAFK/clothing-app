import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {useSelector} from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selectors';

const CartIcon = ({ onClick }) => {
    const itemsCount = useSelector(selectCartCount);

    return (
        <div className='cart-icon-container' onClick={onClick}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemsCount}</span>
        </div>
    )
}

export default CartIcon;