var express = require('express');
var router = express.Router();

const userRoute = require('./user');
const phoneRoute = require('./phone');

router.get('/', async (req, res) => {
  res.status(200).json({
    name   : 'API',
    version: '1.0',
    status : 200,
    message: 'Bienvenue sur l\'API !'
  });
});

router.use('/users', userRoute);
router.use('/phones', phoneRoute);

module.exports = router;