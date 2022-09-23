import { useContext } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const onSignOutHandler = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
        }catch(error) {
            alert(error.message);
        }
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link to='/' className="logo-container">
                    <Logo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span onClick={onSignOutHandler} className="nav-link">
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    )}

                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;