require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();

const newData = new Map([
  [1, { name: 'Cloths', price: 10 }],
  [2, { name: 'Shoes', price: 10 }],
]);

app.use(express.json());
app.use(express.static('public'));

app.post('/checkout-session', async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // if it is subscription then add subscription instead of payment

      line_items: req.body.items.map((item) => {
        const storeItem = newData.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: Math.round(storeItem.price * 100),
          },
          quantity: item.quantity,
        };
      }),

      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/cancel.html`,
    });
    return res.status(200).json(sessions);
  } catch (er) {
    return res.status(500).json({ error: er.message });
  }
});

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Welcome to backend' });
});

app.listen(8080, () => console.log('server running on port 8080'));
