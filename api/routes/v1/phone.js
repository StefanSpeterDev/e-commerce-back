const express = require('express');
const router = express.Router();

const service = require('../../services/v1/phone');

router.get('/:id', service.getById);

router.put('/add', service.add);

router.put('/addAll', service.addAll);

router.patch('/update', service.update);

router.delete('/delete', service.delete);

router.get('/', service.getAll);

module.exports = router;