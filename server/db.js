const Sequelize = require('sequelize');
const Faker from 'faker';

const Conn = new Sequelize(
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const Feedback = Conn.define('feedback', {
  msg: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});


Conn.sync({ force: true }).then(()=> {
    let i = 0;
    while(i< 10) {
        Feedback.create({
            msg: Faker.lorem.sentence(),
            email: Faker.internet.email()
        }).then(msg => {
            console.log(msg)
        });
        i++;
    }
});

module.exports = Conn;