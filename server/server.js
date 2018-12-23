'use strict';

const express = require("express");
const GraphHTTP = require('express-graphql');
// const Schema = require('./schema');
const os = require("os");
const bodyParser = require('body-parser');
const APP_PORT = 8080
import models from './models/index.js';
import Schema from './graphql';

const app = express();



// app.use('/graphql', GraphHTTP({
//   schema: Schema,
//   pretty: true,
//   graphiql: true
// }));

// app.get('/api/getUsername', (req, res) =>
//   res.send({ username: os.userInfo().username })
// );

// app.post('/feedback', () => {

// })

function startApp(port) {
  app.listen(port, function() {
      console.log('Server is listening on port ' + port);
  });
}

models.sequelize.sync()
    .then(function() {
        startApp(APP_PORT);
    })
    .catch(function (e) {
        throw new Error(e);
    });

app.use(express.static("dist"));

app.use(bodyParser.json());

app.use('/graphql', GraphHTTP((request) => ({
  schema: Schema,
  pretty: true,
  graphiql: true
})));
// app.listen(APP_PORT, () => console.log("Listening on port 8080!"));