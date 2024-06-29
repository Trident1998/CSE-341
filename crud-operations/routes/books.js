const express = require('express');
const router = express.Router();
const { bookValidationRules, validate } = require('../utilities/validator');
const utilities = require('../utilities');

const booksController = require('../controllers/books');

router.get('/', utilities.handleErrors(booksController.getAll));

router.get('/:id', utilities.handleErrors(booksController.getSingle));

router.post(
  '/',
  utilities.handleErrors(bookValidationRules(), validate, booksController.createBookRecord)
);

router.put(
  '/:id',
  utilities.handleErrors(bookValidationRules(), validate, booksController.updateBookRecord)
);

router.delete('/:id', utilities.handleErrors(booksController.deleteBookRecord));

module.exports = router;
