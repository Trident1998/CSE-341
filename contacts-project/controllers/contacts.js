const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const contactsController = {};

contactsController.getAllContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json').status(200).json(lists);
  });
};

contactsController.getContactById = async (req, res, next) => {
  const objectId = new ObjectId(req.params.contactId);
  const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: objectId });

  res.setHeader('Content-Type', 'application/json').status(200).json(result);
};

contactsController.createContact = async (req, res, next) => {
  const firstName = req.body.firstName;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  console.log('user', user);
};

module.exports = contactsController;
