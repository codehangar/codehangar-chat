try {
    // Loads environment settings from '.env' into process.env
    // This is for local development
    require('dotenv').load();
} catch (e) {
    console.log('.env file not found')
}

var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var port = parseInt(process.env.PORT || 3500);
var aws = require('aws-sdk');


var storage = multer.diskStorage({
    destination: __dirname + '/tmp/uploads',
    filename: function(req, file, cb) {
        console.log("file.originalname", file.originalname)
        cb(null, file.originalname)
    }
});
var uploading = multer({
    // dest: __dirname + '/tmp/uploads/',
    storage: storage
})



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));


app.use(express.static(__dirname + '/public'));

app.get('/channel/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/pictures/upload', uploading.single('image'), function(req, res) {
    // app.post('/pictures/upload', function(req, res) {
    console.log(req.body) // form fields
    console.log(req.files) // form files
    console.log(req.file) // form files
    res.send(req.files);
})

app.get('/sign_s3', function(req, res) {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    });
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var return_data = {
                signed_request: data,
                url: 'https://' + process.env.S3_BUCKET + '.s3.amazonaws.com/' + req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


var server = app.listen(port, function() {
    console.log('Listening on port: ' + port)
});
