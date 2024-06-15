const express = require('express');
const router = express.Router();
const connectsControlleer = require('../controllers/contacts');

router.get('/', connectsControlleer.getAllContacts);

router.get('/:contactId', connectsControlleer.getConttactById);


module.exports = router;