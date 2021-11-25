const express = require('express');
const router = express.Router();

const service = require('../../services/v1/user');

router.get('/:id', service.getById);

router.put('/add', service.add);

router.patch('/update', service.update);

router.delete('/delete', service.delete);

router.post('/login', service.login)

router.get('/me',service.getMe)

module.exports = router;