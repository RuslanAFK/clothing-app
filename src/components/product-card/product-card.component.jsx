import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';


import './product-card.styles.scss';

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { imageUrl, name, price } = product;


    const addToCartHandler = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCartHandler}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;