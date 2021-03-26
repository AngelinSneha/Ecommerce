import React from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import "../stripe.css";
import StripeCheckout from '../components/StripeCheckout';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
    return (
        <div className="container p-5 text-center">
        <h3>Complete your Payment</h3>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-4">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    )
}

export default Payment
