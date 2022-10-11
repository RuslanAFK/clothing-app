import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormContainer, PaymentFormContainer } from './payment-form.styles';

type PaymentFormProps = {
    totalPrice: number;
}

const PaymentForm: FC<PaymentFormProps> = ({ totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const user = useSelector(selectCurrentUser);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessing(true);

        if (!user) {
            alert("Please login first.");
            return;
        }

        if (!stripe || !elements) { return }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: totalPrice * 100 })
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;
        const { displayName } = user;

        const cardDetails = elements.getElement(CardElement);
        if (!cardDetails) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: displayName,
                }
            }
        });

        setIsProcessing(false);

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            alert(paymentResult.paymentIntent.status);
        }

    }
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit card payment</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessing}>
                    Pay Now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;