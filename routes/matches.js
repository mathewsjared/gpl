'use strict';

var express = require('express'),
     router = express.Router();

var Table = require('../data/knexSetup.js'),
  Matches = Table('matches'),
    Users = Table('users');
// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  Matches().select('*')
  .then(function(data) {
    res.render('Matches', {
      title: 'All Matches',
      data: data
    });
  });
});

// GET ‘/new’ - shows new create new resource page TODO
router.get('/new', function(req, res) {
  res.render('createMatch', {
    title : "Create Match"
  });
});

//GET '/current' - shows current match page
router.get('/current', function(req, res) {
  res.render('currMatch', {
    title: "Current Match"
  });
});


// POST ‘/new’ - creates individual TODO
// curl -d "user1=4&score1=21&user2=3&score2=11" http://localhost:3000/matches/new
router.post('/new', function(req, res) { // curl -d <queryString> http://localhost:3000/matches/new
  var match = {};
  var counter = 0;

  Users().where({
    username: req.body.username1
  })
  .select('*').then(function(user1Data){
    console.log(user1Data);
    match.user_id1 = user1Data[0].id;
      match.score1 = -1;
      
    counter++;

    if(counter > 1) {
      Matches().insert(match).then(function(){
        res.send(JSON.stringify(match) + '\n');
      });
    }
  });

  Users().where({
    username: req.body.username2
  })
  .select('*').then(function(user2Data){
    match.user_id2 = user2Data[0].id;
      match.score2 = -1;

    counter++;

    if(counter > 1) {
      Matches().insert(match).then(function(){
        res.send(JSON.stringify(match) + '\n');
      });
    }
  });

  
});

// GET ‘/:id’ - shows individual resource TODO
router.get('/:id', function(req, res) {
  Matches().where({
    id: req.params.id
  })
  .select('*').then(function(data){
    res.send(JSON.stringify(data) + '\n');
  });
});

// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:id/edit', function(req, res) {
  res.send('takes you to edit individual match page');
});

// PUT ‘/:id’ - updates individual resource TODO
router.put('/:id', function(req, res) { // curl -X PUT -d <queryString> http://localhost:3000/matches/<idNumber>
  var match = {};
  Object.keys(req.body).forEach(function(key){
    match[key] = req.body[key];
  });

  Matches().where({ // 'id', '=', Number(req.params.id)
    id: Number(req.params.id)
  })
  .update(match).then(function(){
    res.send('Updated match: ' + req.params.id + '\n');
  });
});

// DELETE ‘/:id’ - removes resource TODO
router.delete('/:id', function(req, res) { // curl -X DELETE http://localhost:3000/matches/<idNumber>
  Matches().where({
    id: Number(req.params.id)
  })
  .del().then(function(){
    res.send('Deleted match: ' + req.params.id + '\n');
  });
});


module.exports = router;
