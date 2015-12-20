'use strict';

var express = require('express'),
    router = express.Router();

var Table = require('../data/knexSetup.js'),
    Matches = Table('matches');

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
  res.send('Takes you to Create new match page');
});

// POST ‘/new’ - creates individual TODO
// curl -d "user1=2&score1=17&user2=4&score2=21" http://localhost:3000/matches/new
router.post('/new', function(req, res) { // curl -d <queryString> http://localhost:3000/matches/new
  var match = {};

  match.user_id1 = req.body.user1;
  match.score1 = req.body.score1;
  match.user_id2 = req.body.user2;
  match.score2 = req.body.score2;

  Matches().insert(match).then(function(){
    res.send(JSON.stringify(match) + '\n');
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

// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:id/edit', function(req, res) {
  res.send('takes you to edit individual match page');
});

module.exports = router;
