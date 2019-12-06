require('dotenv').config({ path: '.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {

    console.log({ req })

    const token = req.body.id;
    const charge = await stripe.charges.create({
      amount: 5000,
      currency: "USD",
      description: "Emaily credits",
      source: token
    });

    console.log({ charge });
  });
}