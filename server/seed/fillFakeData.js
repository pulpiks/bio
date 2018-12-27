'use strict';
console.log('run server')
require("@babel/register")
require("@babel/polyfill")

const models = require('../models/index.js');

const Conn = models.sequelize
console.log(Conn)
Conn.sync({ force: true }).then(()=> {
    let i = 0;
    while(i< 10) {
        Feedback.create({
            msg: Faker.lorem.sentence(),
            nickname: Faker.name.findName(),
            email: Faker.internet.email(),
        }).then(msg => {
            console.log(msg)
        });
        i++;
    }
});