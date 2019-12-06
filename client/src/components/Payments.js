import React from 'react';
import { useDispatch } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';

import { handleToken } from '../actions';

const Payments = () => {
  const dispatch = useDispatch();

  return (
    <StripeCheckout
      amount={500}  // this is un US cents
      name="Emaily"
      description={`Order of credits`}
      // image={ me.cart[0].item && me.cart[0].item.image }
      stripeKey="pk_test_eyf4rd1jKjYnBQ0ZQXDA9UO500Ukv5bs1O"
      currency="USD"
      // email={me.email}
      token={token => dispatch( handleToken(token) )}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
}

export default Payments;