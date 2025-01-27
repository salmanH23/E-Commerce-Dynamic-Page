const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Qln1KDsrecxE3DZRNw0hZ9FdD5zkC0QoO4yT9J8TlY4gnHgDp631LKg9v64VmAOb5A2FxzymjGei8Rzd0yZTfQP0023NMyAlZ"
); // Replace with your Stripe secret key 
const cors = require("cors");
const app = express();
const port = 4242;

// Middleware setup
app.use(express.json()); 
app.use(cors()); 

// Endpoint to create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "usd", 
    });

    // Log client secret for debugging
    console.log(
      "Payment Intent created, client secret:",
      paymentIntent.client_secret
    );

    // Send the clientSecret in response
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
