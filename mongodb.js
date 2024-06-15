const mongoClient = require('mongodb').MongoClient;

const mongoDBIP = '192.168.1.71';
const mongoDBPort = 27017;

const mongoURL = "mongodb+srv://user:123456Dima@cse341.a7zzah3.mongodb.net/?retryWrites=true&w=majority&appName=CSE341";

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  mongoClient .connect(mongoURL)
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};