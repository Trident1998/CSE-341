const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:123456Dima@cse341.a7zzah3.mongodb.net/?retryWrites=true&w=majority&appName=CSE341";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    await listDatabases(client);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    console.log("Pinged your deployment. You did not connect to MongoDB!");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


app.get('/', (req, res) => {
    res.send('Hello');
})

const port = 5500;

app.listen(process.env.port || port);
console.log('Web Server is litsening t port ' + (process.env.port || port));