'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: "Yuji",
        lastName: "Itadori",
        email: 'jlaw1fan@jjk.io',
        username: 'divergent-fist',
        hashedPassword: bcrypt.hashSync('demolizer')
      },
      {
        firstName: "Megumi",
        lastName: "Fushiguro",
        email: 'demondogs@jjk.io',
        username: 'divinetreasure',
        hashedPassword: bcrypt.hashSync('paparaga')
      },
      {
        firstName: "Nobara",
        lastName: "Kugisaki",
        email: 'tokyolover@jjk.io',
        username: 'strawdoll',
        hashedPassword: bcrypt.hashSync('hairpin')
      },
      {
        firstName: "Saturo",
        lastName: "Gojo",
        email: 'Getobff@jjk.io',
        username: 'chosen-one',
        hashedPassword: bcrypt.hashSync('infinity')
      },
      {
        firstName: "Maki",
        lastName: "Zenin",
        email: 'Maki@jjk.io',
        username: 'restricted-one',
        hashedPassword: bcrypt.hashSync('heavenly')
      },
      {
        firstName: "Kento",
        lastName: "Nanami",
        email: 'beachlover@jjk.io',
        username: 'best-mentor',
        hashedPassword: bcrypt.hashSync('overtime')
      },
      {
        firstName: 'Ryomen',
        lastName: 'Sukuna',
        email: 'disgracedone@jjk.io',
        username: 'KingofCurses',
        hashedPassword: bcrypt.hashSync('MalevolentShrine')
      } 
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'LarryTest', 'FrankTest'] }
    }, {});
  }
};
