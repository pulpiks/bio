'use strict';

const express = require("express");
const GraphHTTP = require('express-graphql');
const Schema = require('./schema');
const os = require("os");
const APP_PORT = 8080

const app = express();

app.use(express.static("dist"));

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.post('/feedback', () => {

})

app.listen(APP_PORT, () => console.log("Listening on port 8080!"));