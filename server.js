var express = require('express');
var app = express();

app.use('/web', express.static(__dirname + '/web'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/lang', express.static(__dirname + '/lang'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('web/index.html', { root: __dirname });
});

port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log('Server started > http://locahost:' + port);
});