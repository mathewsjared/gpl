'use strict';

var express = require('express'),
    router = express.Router();

var http = require('http');
// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
	var url = 'http://www.reddit.com/r/tabletennis.json';

	http.get(url, function(redditRes) {
		var body = '';

		redditRes.on('data', function(chunk) {
			body += chunk;
		});

		redditRes.on('end', function(){

			var redditData = JSON.parse(body);
			console.log(redditData);
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

				res.render('index', {
					title: 'GPL',
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
			});

		//res.render('index', { title: 'GPL Home' });
	}).on('error', function(e) {
		console.log("got an error: ", e);
});
});
var Table = require('../data/knexSetup.js'),
  Matches = Table('matches');

// GET ‘/’ - shows all resources TODO
router.get('/', function(req, res) {
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

		var standings = [];

		for(var key in users) {
			standings.push(users[key]);
		}
		standings.sort(function(userA,userB) {
			return userB.wins - userA.wins;
		});
		if(standings > 10) {
			standings = standings.slice( 0, 10);
		}

		res.render('index', {
			title: 'GPL Home',
			data: standings
		 });
	});
});
module.exports = router;
