var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 9876;

app.use(express.static('.'));
app.use(bodyParser.json());

app.post('/orders/', function(req, res) {
    var data = req.body;
    data.id = '343243';
    res.json(data);
});

app.get('/orders', function(req, res) {
    if (req.query.start === '2015-04-22' && req.query.end === '2015-04-29') {
        res.json([{chocolate: 3, lemon: 0, placed: '2015-04-25'},
                  {chocolate: 2, lemon: 4, placed: '2015-04-28'}]);
    } else {
        res.status(404).json([]);
    }
});

app.listen(port, function() {
    console.log('Listening on port ' + port + '...');
});
