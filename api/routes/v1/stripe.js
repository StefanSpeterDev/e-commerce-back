const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51K00YHFNBEepFrpOnGcvignzlEMjIceh9Yt8Wh6sQS8KX9Sxk4OHGj0u7ckejSj57r4cHj5nUpcgPBXStnvm7ujT007CRLIrXt');

const service = require('../../services/v1/stripe');

router.post('/create-checkout-session', service.checkout);

module.exports = router;