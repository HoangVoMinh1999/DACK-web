require('dotenv').config();

var mongoose=require('mongoose');
var express=require('express');
var router = express.Router();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


//--- create Collection
client.connect(err => {
    console.log("Connected !!!")
    client.close();
});

client.connect(err => {
    const collection = client.db("products").createCollection("products",function(err,res){
        if (err) throw err;
        console.log("create database successfully !!!");
    });
    client.close();
});
module.exports= router;