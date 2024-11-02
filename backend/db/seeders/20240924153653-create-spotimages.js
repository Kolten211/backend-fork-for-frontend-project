'use strict'; 

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object 
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729006171/shinkjuku-home-angle-1_cce9pf.jpg',
        preview: true,
      }, 
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729006167/shinkjuku-home-angle-2_j2co7f.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729006168/shinjuku-bedroom-1_rp2jvb.jpg',
        preview: false,
      }, 
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729006169/shinjuku-bedroom-2_nfcngp.jpg',
        preview: false,
      }, 
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729006195/shinkjuku-home-angle-3_knuypz.jpg',
        preview: false,
      }, 
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729005100/kyoto_front_building_imljd6.webp',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729005011/01-kyoto-house_kplxe7.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729005335/kyoto-house-garden_jaehg9.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729005506/room-in-kyoto-house_mq6494.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729005522/07-kyoto-house-bedroom_mshpe9.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185716/th_jug7s9.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185720/th_uqyihd.jpg',
        preview: false,
      }, 
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185727/th_obg85z.jpg',
        preview: false,
      },  
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185748/th_gmjkuo.jpg',
        preview: false,
      },  
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185797/th_pxiypj.jpg',
        preview: false,
      },   
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729382124/th_p4zi5n.jpg',
        preview: true,
      },
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729382157/th_nru7cu.jpg',
        preview: false,
      },
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729381878/th_u8nrpr.jpg',
        preview: false,
      },
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729381849/th_gp2o2i.jpg',
        preview: false,
      },
      {
        spotId: 4, 
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729381812/th_wxtjh2.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185876/th_raft8x.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185884/th_ueke9t.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729185970/th_ysxpjb.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186012/th_ic7o5p.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186110/th_kejuma.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186316/th_expdrz.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186185/th_hsulgq.jpg',
        preview: false,
      }, 
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186216/th_d3oyh2.jpg',
        preview: false,
      }, 
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186301/th_hthbyn.jpg',
        preview: false,
      }, 
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dozliephp/image/upload/v1729186522/th_xcvktu.jpg',
        preview: false,
      },  
    ],  { validate: true })
  },
  // ,  { validate: true }
  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://res.cloudinary.com/dozliephp/image/upload/v1729006171/shinkjuku-home-angle-1_cce9pf.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729005011/01-kyoto-house_kplxe7.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729005335/kyoto-house-garden_jaehg9.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729005506/room-in-kyoto-house_mq6494.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729005522/07-kyoto-house-bedroom_mshpe9.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729005100/kyoto_front_building_imljd6.webp',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729185716/th_jug7s9.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729185523/519566733443_168437547908961_hz448x.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729185876/th_raft8x.jpg',
        'https://res.cloudinary.com/dozliephp/image/upload/v1729186316/th_expdrz.jpg',
      ] }
    }, {});
  }
};
