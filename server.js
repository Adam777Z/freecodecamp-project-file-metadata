'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer'); // require and use "multer"...
var upload = multer({ storage: multer.memoryStorage() }); // store temporarily in memory only

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (req.file !== undefined) {
    res.json({ filename: req.file.originalname, size: req.file.size, type: req.file.mimetype });
  } else {
    res.json({ error: 'file is required' });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
