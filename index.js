const express = require('express')
const app = express()
const port = 80
const cors = require('cors')
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:Password@cluster0.m4pnh.mongodb.net/test?retryWrites=true&w=majority";

app.use(cors())

app.get('/', (req, res) => {
  console.log('------- Calling Node.js server -------');
})

app.get('/getPlayerInfo', (req, res) => {
    console.log('------- Calling getPlayerInfo -------');
    
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("playerinfo");
      console.log('Connected successfully to server');    
      findDocuments(collection, function(response) {
        res.json({data: response[0]});       
        client.close();
      }, Number(req.query.id)); 
    });
})

const findDocuments = function(collection, callback, playerId) {
    // Get the documents collection
    collection.find({"playerId": playerId}).toArray(function(err, docs) {
        //assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
};

app.get('/getShotChart', (req, res) => {
    console.log('------- Calling getShotChart -------');
    
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("playershotchart");
      console.log('Connected successfully to server');    
      findDocuments(collection, function(response) {
        res.json({data: response[0]});       
        client.close();
      }, Number(req.query.id)); 
    });
    // let rawdata = fs.readFileSync('playershotchart.json');
    // let data = JSON.parse(rawdata);
    // res.json({data: data[req.query.id]});
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})