var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');

var bodyParser = require('body-parser');

var wikiRouter = require('./routes/wiki');

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')));


var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.set('view cache',false);
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('index');
})

app.use('/wiki',wikiRouter);






module.exports = app;