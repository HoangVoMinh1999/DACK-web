require('dotenv').config();

var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var mongoose=require('mongoose');
var products=require('../myDatabase/products');

const MongoClient = require('mongodb').MongoClient;
var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

console.log(uri);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Võ Minh Hoàng' });
});
//------------------------------------------------
router.get('/showProducts', function(req, res, next) {
  client.connect(err => {
    var data=[];
    const collection = client.db("products").collection("products");
    let query={};
    var cursor=collection.find(query);
    cursor.each(function(err,item){
      if (err) throw err;
      if (item!=null){
        console.log(item);
        data.push(item);
      }
    });
    // client.close();
    res.render('products',{title:'Products',products:data});
  });
});
//------------------------------------------------
router.get('/showProducts:type',function(req,res,next){
  var data=[];
  client.connect(err => {
    const collection = client.db("products").collection("products");
    let query={
      type: req.params.type,
    };
    var cursor=collection.find(query);
    cursor.each(function(err,item){
      if (err) throw err;
      if (item!=null){
        console.log(item);
        data.push(item);
      }
    });
    // client.close();
    res.render('products',{title:'Products',products:data});
  });
});
//------------------------------------------------
router.get('/show:brand',function(req,res,next){
  var data=[];
  client.connect(err => {
    const collection = client.db("products").collection("products");
    let query={
      brand: req.params.brand,
    };
    var cursor=collection.find(query);
    cursor.each(function(err,item){
      if (err) throw err;
      if (item!=null){
        console.log(item);
        data.push(item);
      }
    });
    // client.close();
    res.render('products',{title:'Products',products:data});
  });
});
//--------------------------------------------------
router.get('/detail:_id',function(req,res,next){
  var data=[];
  client.connect(err => {
    const collection = client.db("products").collection("products");
    let query={
      _id: req.params._id,
    };
    var cursor=collection.find(query);
    cursor.each(function(err,item){
      if (err) throw err;
      if (item!=null){
        console.log(item);
        data.push(item);
      }
    });
    client.close();
    res.render('products',{title:'Products',products:data});
  });
});

module.exports = router;
