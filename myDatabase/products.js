var mongoose=require('mongoose');
var products=require('../models/products');
var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');

const MongoClient = require('mongodb').MongoClient;
var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

///---Database of Shirt

function data(id,name,brand,type,price){
    this.id=id;
    this.name=name;
    this.brand=brand;
    this.type=type;
    this.price=price;
}

var data_products=[
    new data(
        "S_01",
        "viettien_01",
        "Việt Tiến",
        "Shirt",
        1000000
    ),
    new data(
        "S_01",
        "viettien_02",
        "Việt Tiến",
        "Shirt",
        500000
    ),
    new data(
        "S_03",
        "viettien_03",
        "Việt Tiến",
        "Shirt",
        45678
    ),
    new data(
        "Sh_01",
        "Adidas_01",
        "Adidas",
        "Shoes",
        1000000
    ),
    new data(
        "Sh_01",
        "Adidas_02",
        "Adidas",
        "Shoes",
        500000
    ),   
    new data(
        "Sh_03",
        "Nike_03",
        "Nike",
        "Shoes",
        345678
    ),
    new data(
        "T_01",
        "Levis_011",
        "Levis",
        "Trousers",
        1000000
    ),
    new data(
        "T_01",
        "Levis_012",
        "Levis",
        "Trousers",
        500000
    ),
    new data(
        "T_03",
        "Levis_013",
        "Levis",
        "Trousers",
        345678
    )
       
];
//--- insert Data
client.connect(err => {
    const collection = client.db("products").collection("products");
    collection.insertMany(data_products,function(err,res){
        if (err) throw err;
        console.log("Insert data successfully !!!");
    });
    client.close();
  });


module.exports= router;