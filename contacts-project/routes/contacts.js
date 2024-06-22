const express = require('express');
const router = express.Router();
const connectsController = require('../controllers/contacts');

router.get('/', connectsController.getAllContacts);

router.get('/:contactId', connectsController.getContactById);

router.post('/', connectsController.createContact);

router.put('/:contactId', connectsController.updateContact);

router.delete('/:contactId', connectsController.deleteContact);

module.exports = router;
