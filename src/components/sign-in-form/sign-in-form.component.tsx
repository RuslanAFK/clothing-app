import { ChangeEvent, FormEvent, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
import './sign-in.styles.scss';
import { emailSigninStart, googleSigninStart } from "../../store/user/user.actions";
import { AuthError } from "firebase/auth";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const signInWithGoogle = async () => {
        dispatch(googleSigninStart());
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSigninStart(email, password));
            resetFormFields();
        } catch (error) {
            alert((error as AuthError).message);
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
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        With Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;