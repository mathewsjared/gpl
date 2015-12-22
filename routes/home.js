'use strict';

var express = require('express'),
    router = express.Router();

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

		res.render('index', { 
			title: 'GPL Home'
		 });
	});
});


module.exports = router;
