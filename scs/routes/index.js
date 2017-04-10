var express = require('express');
var router = express.Router();

var SinaCloud = require('scs-sdk');
SinaCloud.config.loadFromPath('routes/config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	var s3bucket = new SinaCloud.S3({params: {Bucket: 'cms-uploads-test'}});

	s3bucket.getBucketAcl(function(err, data) {
    if (err) {
        console.log(err);   // an error occurred
    } else {
        console.log(data);  // successful response
    }
	});
	
  res.render('index', { title: 'Express' });
});

module.exports = router;
