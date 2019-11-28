require('dotenv').config();

var mongoose=require('mongoose');
var express=require('express');
var router = express.Router();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


//--- create Collection
MongoClient.connect(uri, 
    { useNewUrlParser: true,useUnifiedTopology: true },
  function(err, client) {
    console.log("Connected successfully to server");
  
    const db = client.db("products");
  
    findDocuments(db, function() {
        client.close();
      });
  });
  
  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('products');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }


module.exports= router;