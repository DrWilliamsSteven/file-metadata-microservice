// following the fantastic tutorial by:
//https://zellwk.com/blog/crud-express-mongodb/

var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer')
var upload = multer()

// for app
var app = express();

var PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set static views
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.


app.set('view engine', 'ejs');
app.set('views', './views');

// connect to mongoDB

app.post('/new', upload.single('fileToUpload'), (req, res) => {
  console.log("In comes a " + req.method + " to " + req.url);
  console.log(req.file.size)

  var result = {
    size: req.file.size
  }
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(result));
});

app.get('/', (req, res) => {
  res.render('index.ejs', {
    error: null,
    display: 'none'
  });
});


app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
})
