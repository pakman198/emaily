require('dotenv').config({ path: '.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {

    // console.log({ req })

    const { body: token, user } = req;
    const charge = await stripe.charges.create({
      amount: 5000,
      currency: "USD",
      description: "Emaily credits",
      source: token.id
    });

    console.log({ charge, user });

    // when we initialize passport, we start using the User model.
    // on every request we have the user available, and passport is in charge of serializing and deserializing.
    // that's why here we can just update the credits property and then use the mogoose method to 
    // update the information.
    user.credits += 5
    const updatedUser = await user.save();

    res.send(updatedUser);
  });
}