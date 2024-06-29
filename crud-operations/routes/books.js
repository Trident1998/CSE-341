const express = require('express');
const router = express.Router();
const { bookValidationRules, validate } = require('../utilities/validator');
const utilities = require('../utilities');

const booksController = require('../controllers/books');

router.get('/', utilities.handleErrors(booksController.getAll));

router.get('/:id', utilities.handleErrors(booksController.getSingle));

router.post(
  '/',
  bookValidationRules(),
  validate,
  utilities.handleErrors(booksController.createBookRecord)
);

router.put(
  '/:id',
  bookValidationRules(),
  validate,
  utilities.handleErrors(booksController.updateBookRecord)
);

router.delete('/:id', utilities.handleErrors(booksController.deleteBookRecord));

module.exports = router;
