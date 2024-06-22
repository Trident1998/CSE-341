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
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);

  if (result.acknowledged) {
    console.log('Contact was inserted with the ID', result.insertedId);
    res.status(201).json({ contactId: result.insertedId }).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while inserting the contact.');
  }
};

contactsController.updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.contactId);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);

  if (result.modifiedCount > 0) {
    console.log('Contact was updated with the ID', contactId);
    res.status(201).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

contactsController.deleteContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.contactId);

  console.log('contactId', contactId);

  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });

  console.log('result', result);

  if (result.deletedCount > 0) {
    console.log('Contact was deleted with the ID', contactId);
    res.status(201).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = contactsController;
