import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payments = () => {
  return (
    <StripeCheckout
      amount={500}  // this is un US cents
      name="Emaily"
      description={`Order of credits`}
      // image={ me.cart[0].item && me.cart[0].item.image }
      stripeKey="pk_test_eyf4rd1jKjYnBQ0ZQXDA9UO500Ukv5bs1O"
      currency="USD"
      // email={me.email}
      token={token => console.log({ token })}
    />
  );
}

export default Payments;