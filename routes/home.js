'use strict';

var express = require('express'),
    router = express.Router();
var http = require('http');
var Table = require('../data/knexSetup.js'),
  Matches = Table('matches'),
  Users = Table('users');

var bcrypt = require('bcrypt');

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
  var counter = 0;
  var standings = [];
  var url = 'http://www.reddit.com/r/tabletennis.json';

	http.get(url, function(redditRes) {
		var body = '';

		redditRes.on('data', function(chunk) {
			body += chunk;
		});

		redditRes.on('end', function(){

			var redditData = JSON.parse(body);
			var dataArray = [];
				for (var i = 0; i < 5; i++) {
					var url = redditData.data.children[i].data.url;
					var title = redditData.data.children[i].data.title;
					var thumbnail = redditData.data.children[i].data.thumbnail;
				dataArray.push({
					title: title,
					url: url,
					thumbnail: thumbnail
				});

				}
        counter++;
        if (counter === 2) {
          res.render('index', {
      			title: 'GPL Home',
      			data: standings,
            redditUrl0: dataArray[0].url,
            redditUrl1: dataArray[1].url,
            redditUrl2: dataArray[2].url,
            redditUrl3: dataArray[3].url,
            redditUrl4: dataArray[4].url,
            redditTitle0: dataArray[0].title,
            redditTitle1: dataArray[1].title,
            redditTitle2: dataArray[2].title,
            redditTitle3: dataArray[3].title,
            redditTitle4: dataArray[4].title,
            redditThumb: dataArray[3].thumbnail
      		 });
        }
			});

		//res.render('index', { title: 'GPL Home' });
	}).on('error', function(e) {
		console.log("got an error: ", e);
});
	Matches().select('*').then(function(matchesData){
		var users = {};
		matchesData.forEach(function(match) {
			var winner, loser;

			if(match.score1 > match.score2) {
				winner = match.username1;
				loser = match.username2;
			} else {
				winner = match.username2;
				loser = match.username1;
			}

			if(users.hasOwnProperty(winner)) {
				users[winner].wins++;
			} else {
				users[winner] = {
					wins : 1,
					loses : 0,
					username : winner
				};
			}

			if(users.hasOwnProperty(loser)) {
				users[loser].loses++;
			} else {
				users[loser] = {
					wins : 0,
					loses : 1,
					username : loser
				};
			}
		});

		for(var key in users) {
			standings.push(users[key]);
		}
		standings.sort(function(userA,userB) {
			return userB.wins - userA.wins;
		});
		if(standings > 10) {
			standings = standings.slice( 0, 10);
		}

    counter++;
    if (counter === 2) {
      res.render('index', {
        title: 'GPPL Home',
        data: standings,
        redditUrl0: dataArray[0].url,
        redditUrl1: dataArray[1].url,
        redditUrl2: dataArray[2].url,
        redditUrl3: dataArray[3].url,
        redditUrl4: dataArray[4].url,
        redditTitle0: dataArray[0].title,
        redditTitle1: dataArray[1].title,
        redditTitle2: dataArray[2].title,
        redditTitle3: dataArray[3].title,
        redditTitle4: dataArray[4].title,
        redditThumb: dataArray[3].thumbnail
       });
    }
	});
});

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'User Login'
  });
});

router.post('/login', function(req, res){
  Users().where({
    username: req.body.username,
  }).first().then(function(user){
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        res.cookie('username', user.username, { signed: true });
        res.redirect('/users/' + user.username);
      } else {
        res.redirect('ERROR: Invalid Username or Password.');
      }
    } else {
      res.redirect('ERROR: No user with that email.');
    }
  });
});

router.get('/logout', function(req, res){
  res.clearCookie('username');
  res.redirect('/');
});

router.get('/about', function(req, res) {
  res.render('about', {
    title: 'About GPPL'
  });
});

module.exports = router;
