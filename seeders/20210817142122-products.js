'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          id: 1,
          name: 'Android 10',
          price: 5000,
          merchant_id: 1,
          status: 'sold',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Apple iPhone Pro',
          price: 3000,
          merchant_id: 2,
          status: 'new',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Apple Watch',
          price: 80000,
          merchant_id: 3,
          status: 'new',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Vespa Primavera',
          price: 5000,
          merchant_id: 1,
          status: 'new',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'New Balance 574 Core',
          price: 4500,
          merchant_id: 1,
          status: 'new',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Tribe Messenger Bike 004',
          price: 3000,
          merchant_id: 1,
          status: 'sold',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: 'Stumptown Hair Bender Coffee',
          price: 6000,
          merchant_id: 8,
          status: 'sold',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
