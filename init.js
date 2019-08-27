var express = require('express');
var app = express();
var cors = require("cors");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

const route = require('./router/route')
//const auth = require('./pr0ject/src/services/api')

app.get('/', function(req, res) {
  res.send('Olá Mundo!');
});

app.post('/intro', route);

app.post('/session', route);

app.get('/session', route);

app.get('/admin', route);

app.get('/intro', route);

app.put('/intro', route);

app.put('/admin', route);

app.listen(3001, function() {
  console.log('App de Exemplo escutando na porta 3001!');
});

module.exports = app;