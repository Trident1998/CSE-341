const express = require('express');
const mongodb = require('./db/connect.js');
const contactsRoutes = require('./routes/contacts.js');
const app = express();

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
