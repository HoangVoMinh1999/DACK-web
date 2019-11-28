var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forget_password', { title: 'Forget Password' });
});

module.exports = router;
