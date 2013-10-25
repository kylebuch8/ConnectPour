var express = require('express'),
	http = require('http'),
	querystring = require('querystring'),
	app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function() {
	app.use(allowCrossDomain);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/v2/search', function(req, res) {
    var queryString = querystring.stringify(req.body);
    console.log(req);
    var options = {
        hostname: 'api.brewerydb.com',
        path: req.url,
        method: 'GET'
    };
    
    var response = res;
    var str = '';
    var request = http.request(options, function(res) {
        res.on('data', function(chunk) {
            str += chunk;
        });

        res.on('end', function() {
            response.set('Content-Type', 'application/json');
            response.send(JSON.parse(str));
        });
    });

    request.write(queryString);
    request.end();
});

app.listen(3000);
console.log('Listening on port 3000');