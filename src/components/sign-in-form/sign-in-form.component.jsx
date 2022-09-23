import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in.styles.scss';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            alert(error.message)
        }

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="auth-form-container">
            <h2>I already have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label="Password"
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button
                        type="button"
                        onClick={signInWithGoogle}
                        buttonType='google'
                    >
                        Sign In With Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;