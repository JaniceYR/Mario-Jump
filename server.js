var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/asset/styles", express.static(__dirname + '/asset/styles'));
app.use("/asset/images", express.static(__dirname + '/asset/images'));
app.use("/asset/sounds", express.static(__dirname + '/asset/sounds'));
app.use("/lib", express.static(__dirname + '/lib'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
// app.get('/about', function (req, res) {
//   res.sendFile(path.join(__dirname + 'views/about.html'));
// });

app.listen(process.env.PORT || 8080);
