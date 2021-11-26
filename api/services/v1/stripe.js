const YOUR_DOMAIN = 'http://127.0.0.1:8081';
const stripe = require('stripe')('sk_test_51K00YHFNBEepFrpOnGcvignzlEMjIceh9Yt8Wh6sQS8KX9Sxk4OHGj0u7ckejSj57r4cHj5nUpcgPBXStnvm7ujT007CRLIrXt');

exports.checkout = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
                price: req.body.id,
                quantity: 1,
            }
        ],
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}`,
        cancel_url: `http://www.google.fr`,
    });
    console.log(session.url);
    res.redirect(303, session.url);
}