import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectCurrentUser, selectUserIsLoading } from "../../store/user/user.selectors";
import { signoutStart } from '../../store/user/user.actions';

import { LogoContainer, NavigationContainer, Navlink, NavlinksContainer } from "./navigation.styles";
import { selectIsCartOpen } from "../../store/cart/cart.selectors";
import { setIsCartOpen } from "../../store/cart/cart.actions";

const Navigation = () => {
    const isLoading = useSelector(selectUserIsLoading);
    const dropdownOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();
    const toggleDropdownHandler = () => dispatch(setIsCartOpen(!dropdownOpen));
    const signOutUser = () => dispatch(signoutStart());

    const currentUser = useSelector(selectCurrentUser);
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Logo className="logo" />
                </LogoContainer>
                <NavlinksContainer>
                    <Navlink to='/shop'>
                        SHOP
                    </Navlink>
                    {isLoading ? (<span>Loading...</span>) :
                        currentUser ? (
                            <NavLink onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>
                        ) : (
                            <Navlink to='/auth'>
                                SIGN IN
                            </Navlink>
                        )
                    }
                    <CartIcon onClick={toggleDropdownHandler} />
                </NavlinksContainer>
                {dropdownOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation;