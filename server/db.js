'use strict'
const Sequelize = require('sequelize');
import Faker from 'faker';

const Conn = new Sequelize(
  'postgres',
  'kseniamahorkina',
  '12345',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

Conn.sync({ force: true })
  .then(() => () => {
      console.log('sync')
  })
  .catch(e => {
    throw new Error(e)
  });


// const Feedback = Conn.define('feedback', {
//   msg: {
//     type: Sequelize.TEXT,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true
//     }
//   }
// });


// Conn.sync({ force: true }).then(()=> {
//     let i = 0;
//     while(i< 10) {
//         Feedback.create({
//             msg: Faker.lorem.sentence(),
//             email: Faker.internet.email()
//         }).then(msg => {
//             console.log(msg)
//         });
//         i++;
//     }
// });

export default Conn;