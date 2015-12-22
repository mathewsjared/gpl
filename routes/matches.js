'use strict';

var express = require('express'),
  router = express.Router();

var Table = require('../data/knexSetup.js'),
  Matches = Table('matches'),
  Users = Table('users');

var https = require('https');

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  Matches().select('*')
    .then(function(data) {
      res.render('matches', {
        title: 'All Matches',
        data: data
      });
    });
});

// GET ‘/new’ - shows new create new resource page TODO
router.get('/new', function(req, res) {
  res.render('createMatch', {
    title: "Create Match"
  });
});

// POST ‘/new’ - creates individual TODO
// curl -d "user1=4&score1=21&user2=3&score2=11" http://localhost:3000/matches/new
router.post('/new', function(req, res) { // curl -d <queryString> http://localhost:3000/matches/new

  var match = {};

  match.username1 = req.body.username1;
  match.score1 = req.body.score1;
  match.username2 = req.body.username2;
  match.score2 = req.body.score2;

  //Slackbot
  var postData = JSON.stringify({
    "channel": "#group-og",
    "username": "webhookbot",
    "text": "This is posted to #group-og and comes from a bot named webhookbot.",
    "icon_emoji": ":ghost:"
  });

  var postOptions = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: '/services/T027GBYPB/B0H5E7RKJ/AYnWoFYnMQY3omEEgpmX45ta',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var slackReq = https.request(postOptions, function(slackRes) {
    console.log(slackRes);

    console.log('Status:' + slackRes.statusCode);
  });
  slackReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  slackReq.write(postData);
  slackReq.end();

  Matches().returning('id').insert(match).then(function(newId) {
    res.redirect('/matches/' + newId);
  });
});


// GET ‘/:id’ - shows individual resource TODO
router.get('/:id', function(req, res) {
  Matches().where({
      id: req.params.id
    })
    .select('*').then(function(data) {
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
  Object.keys(req.body).forEach(function(key) {
    match[key] = req.body[key];
  });

  Matches().where({ // 'id', '=', Number(req.params.id)
      id: Number(req.params.id)
    })
    .update(match).then(function() {
      res.send('Updated match: ' + req.params.id + '\n');
    });
});

// DELETE ‘/:id’ - removes resource TODO
router.delete('/:id', function(req, res) { // curl -X DELETE http://localhost:3000/matches/<idNumber>
  Matches().where({
      id: Number(req.params.id)
    })
    .del().then(function() {
      res.send('Deleted match: ' + req.params.id + '\n');
    });
});


module.exports = router;
