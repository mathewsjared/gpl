'use strict';

var express = require('express'),
    router = express.Router();

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  res.render('index', { title: 'GPL Home' });
});

module.exports = router;
