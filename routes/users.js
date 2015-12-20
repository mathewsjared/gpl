'use strict';

var express = require('express'),
    router = express.Router();

var Table = require('../data/knexSetup.js'),
    Users = Table('users');

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  Users().select('*')
  .then(function(data) {
    res.render('users', {
      title: 'All Users',
      data: data
    });
  });
});

// GET ‘/new’ - shows new create new resource page TODO
router.get('/new', function(req, res) {
  res.send('Takes you to Create new user page');
});

// POST ‘/new’ - creates individual TODO
// curl -d "firstName=Jimmy&lastName=Kary&email=jimmy@gpl.com&username=jimster&password=sdjhfsl" http://localhost:3000/users/new
router.post('/new', function(req, res) { // curl -d <queryString> http://localhost:3000/users/new
  var user = {};

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  Users().insert(user).then(function(){
    res.send(JSON.stringify(user) + '\n'); // Placeholder
  });
});

// GET ‘/:id’ - shows individual resource TODO
router.get('/:id', function(req, res) {
  Users().where({
    id: req.params.id
  })
  .select('*').then(function(data){
    res.send(JSON.stringify(data) + '\n'); // Placeholder
  });
});

// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:id/edit', function(req, res) {
  res.send('takes you to edit individual user page');
});

// PUT ‘/:id’ - updates individual resource TODO
router.put('/:id', function(req, res) { // curl -X PUT -d <queryString> http://localhost:3000/users/<userID>
  var user = {};
  Object.keys(req.body).forEach(function(key){
    user[key] = req.body[key];
  });

  Users().where({ // 'id', '=', Number(req.params.id)
    id: Number(req.params.id)
  })
  .update(user).then(function(){
    res.send('Updated user: ' + req.params.id + '\n');
  });
});

// DELETE ‘/:id’ - removes resource TODO
router.delete('/:id', function(req, res) { // curl -X DELETE http://localhost:3000/users/<userID>
  Users().where({
    id: Number(req.params.id)
  })
  .del().then(function(){
    res.send('Deleted user: ' + req.params.id + '\n');
  });
});


module.exports = router;
