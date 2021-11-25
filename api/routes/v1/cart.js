const express = require('express');
const router = express.Router();

const service = require('../../services/v1/cart');

router.put('/add', service.add);
router.get('/:id', service.getById);
router.get('/', service.get);

module.exports = router;