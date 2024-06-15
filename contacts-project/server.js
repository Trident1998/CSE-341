const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!!');
})


app.listen(process.env.port || port);
console.log('Web Server is litsening t port ' + (process.env.port || port));