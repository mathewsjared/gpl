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
				})	
			});
		
		//res.render('index', { title: 'GPL Home' });
	}).on('error', function(e) {
		console.log("got an error: ", e);
	});
});



module.exports = router;
