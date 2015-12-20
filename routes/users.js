'use strict';

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'Mathews',
    password : 'password',
    database : 'gpldb'
  },
  searchPath: 'knex,public',
  debug: true
});

var express = require('express'),
    router = express.Router();


// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  knex.select('*').from('users').then(function(data) {
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
router.post('/new', function(req, res) { // curl -d "firstName=Thing&lastName=Bang&email=thingBang@123.com&username=Thinggy&password=adsahea" http://localhost:3000/users/new
  var user = {};

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  knex.insert(user).into('users').then(function(){
    res.send(JSON.stringify(user) + '\n');
  });
});

// GET ‘/:id’ - shows individual resource TODO
router.get('/:id', function(req, res) {
  knex('users').where({
    id: req.params.id
  }).select('*').then(function(data){
    res.send(JSON.stringify(data) + '\n');
  });
});

// PUT ‘/:id’ - updates individual resource TODO
router.put('/:id', function(req, res) { // curl -X PUT -d "email=5432@gpl.com" http://localhost:3000/users/5
  var user = {};
  Object.keys(req.body).forEach(function(key){
    user[key] = req.body[key];
  });

  knex('users')
  .where('id', '=', Number(req.params.id))
  .update(user)
  .then(function(){
    res.send('Updated user: ' + req.params.id + '\n');
  });
});

// DELETE ‘/:id’ - removes resource TODO
router.delete('/:id', function(req, res) { // curl -X DELETE http://localhost:3000/users/6
  knex('users').where({
    id: req.params.id
  }).del().then(function(){
    res.send('Deleted user: ' + req.params.id + '\n');
  });
});


// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:id/edit', function(req, res) {
  res.send('takes you to edit individual user page');
});

module.exports = router;
