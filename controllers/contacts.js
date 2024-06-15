const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const conttactsController = {};

conttactsController.getAllContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    .status(200)
    .json(lists); 
  });
};

conttactsController.getConttactById = async (req, res, next) => {
  const objectId = new ObjectId(req.params.contactId);
  const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: objectId });

  res.setHeader('Content-Type', 'application/json')
    .status(200)
    .json(result);
};

module.exports = conttactsController;