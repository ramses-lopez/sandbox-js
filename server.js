var express = require('express');
var app = express();

var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var ejs = require('ejs');

app.use('/web', express.static(__dirname + '/web'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/lang', express.static(__dirname + '/lang'));

app.get('/', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('web/index.html', { root: __dirname });
});

port = process.env.PORT || 3001;

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

app.listen(port, function () {
	console.log('Server started > http://locahost:' + port);
    console.log('-----------------------------------------')
	console.log('S3_BUCKET', S3_BUCKET)
	console.log('AWS_ACCESS_KEY',AWS_ACCESS_KEY)
	console.log('AWS_SECRET_KEY', AWS_SECRET_KEY)
});

app.get('/sign', (req, res) => {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        // ContentType: undefined,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3_params, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
			
			console.log('data', data)
			//data esta viniendo html encoded -_-
			console.log('decoded', decodeURIComponent(data));
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

app.put('/upload', (req, res) => {
    console.log(req.files)
    res.end()
})


