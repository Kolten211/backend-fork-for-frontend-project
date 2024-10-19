'use strict'; 

const { Spot } = require('../models'); 

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "Kabukichō 1-4-1, Shinjuku-ku, Tokyo 160-8484",
        city: "Tokyo",
        state: "Shinjuku", 
        country: "Japan", 
        lat:  35.6938, 
        lng: 139.7036, 
        name: "1st Mission", 
        description: "Around the corner from Shinjuku station, enjoy the many shopping outlets inthe areas.",
        price: 53.00,
      },
      {
        ownerId: 1,
        address: "789 Baseball Field Lane",
        city: "Kyōto",
        state: "Kyōto Prefecture", 
        country: "Japan", 
        lat: 42.361145, 
        lng: -71.057083, 
        name: "Kyoto Exchange", 
        description: "Perfect little place close to the heart of kyoto", 
        price: 66.00,
      },
      {
        ownerId: 2,
        address: "2135 Street Corner",
        city: "Shibuya",
        state: "Tokyo", 
        country: "Japan", 
        lat: 35.661777, 
        lng: 139.704051, 
        name: "The Incident", 
        description: "Cozy area wher things happen", 
        price: 60.00,
      },
      {
        ownerId: 6,
        address: "73152 Woodward Avenue",
        city: "Yoron Island",
        state: "Kagoshima", 
        country: "Japan", 
        lat: 27.038884, 
        lng: 128.432503, 
        name: "Nanami's Paradise", 
        description: "A place you can relax on the beach and forget about all your worries.", 
        price: 45.00,
      },
      {
        ownerId: 2,
        address: "31 Caribbean Sea",
        city: "Mishima island",
        state: "Yamguchi",
        country: "Japan", 
        lat: 13.1677,
        lng: -59.6171,
        name: "Dagon's Domain",
        description: "Saturated bamboo and polinated Lilies, towels provided",
        price: 100.00,
      },
      {
        ownerId: 2,
        address: "50 Edo Avenue",
        city: "Kyōto",
        state: "Kyōto Prefecture",
        country: "Japan", 
        lat: 13.1677,
        lng: -59.6171,
        name: "Mecha Marus Home",
        description: "A more traditional stay, with classic edo era bedding. A beautiful court yard to enjoy your time in bliss",
        price: 100.00,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["1st Mission", "Kyoto Exchange", "The Incident", "Nanami's Paradise", "Dagon's Domain"] }
    }, {});
  }
};
