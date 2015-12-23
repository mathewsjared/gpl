'use strict';

var express = require('express'),
  router = express.Router();

var Table = require('../data/knexSetup.js'),
  Users = Table('users');

var bcrypt = require('bcrypt');

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  Users().select('*')
    .then(function(usersData) {
      res.render('users', {
        title: 'All Users',
        data: usersData
      });
    });
});

// GET ‘/new’ - shows new create new resource page TODO
router.get('/new', function(req, res) {
  res.render('createUser', {
    title: 'Create New User'
  });
});

// POST ‘/new’ - creates individual TODO
// curl -d "firstName=Jimmy&lastName=Kary&email=jimmy@gpl.com&username=jimster&password=sdjhfsl" http://localhost:3000/users/new
router.post('/new', function(req, res) { // curl -d <queryString> http://localhost:3000/users/new
  var user = {};

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = bcrypt.hashSync(req.body.password, 10);

  Users().where({
    username: req.params.username
  }).first().then(function(userExists){
    if(!userExists) {
      Users().insert(user, 'username').then(function(username) {
        res.cookie('Username', user.username, { signed: true });
        res.redirect('/users/' + username);
      });
    } else {
      res.status(409);
      res.redirect('/login.html?error=You have already signed up. Please login.');
    }
  });
});

// GET ‘/:id’ - shows individual resource TODO
router.get('/:username', function(req, res) {
  Users().where({
      username: req.params.username
    })
    .select('*').then(function(data) {
      var user = {};
      user.first_name = data[0].first_name;
      user.last_name = data[0].last_name;
      user.username = data[0].username;
      user.email = data[0].email;

      res.render('userProfile', {
        title: 'Title',
        username: user.username,
        first: user.first_name,
        last: user.last_name,
        email: user.email,
        edit_link: '/users/' + req.params.username + '/edit'
      });
    });
});

// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:username/edit', function(req, res) {
  if(req.signedCookies.Username === req.params.username) {
    Users().where({
        username: req.params.username
      })
      .select('*').then(function(data) {
        var user = {};
        user.first_name = data[0].first_name;
        user.last_name = data[0].last_name;
        user.email = data[0].email;
        user.username = data[0].username;
        user.password = data[0].password;

        res.render('editUser', {
          title: 'Edit User: ' + user.username,
          first: user.first_name,
          last: user.last_name,
          email: user.email,
          username: user.username,
          password: user.password
        });
      });
  } else {
    res.send('You do not have permission to edit this user...');
  }
});

// PUT ‘/:id’ - updates individual resource TODO
//curl -X PUT -d 'username=thing' http://localhost:3000/users/jaredM123
router.put('/:username', function(req, res) { // curl -X PUT -d <queryString> http://localhost:3000/users/<userID>
  var user = {};
  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  Users().where({ // 'id', '=', Number(req.params.id)
      username: req.params.username
    })
    .update(user).then(function() {
      res.send('http://localhost:3000/users/');
      // res.redirect('/users/:username');
    });
});


// DELETE ‘/:id’ - removes resource TODO
router.delete('/:username', function(req, res) { // curl -X DELETE http://localhost:3000/users/<userID>
  Users().where({
      username: req.params.username
    })
    .del().then(function() {
      res.send('Deleted user: ' + req.params.id + '\n');
    });
});



module.exports = router;
