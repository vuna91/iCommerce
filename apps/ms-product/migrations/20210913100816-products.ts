module.exports = {
  async up(db) {
    const mongoose = require('mongoose');
    const brands = [
      {
        _id: new mongoose.Types.ObjectId('613f242d82d0479055e95dcc'),
        name: 'Apple',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('613f2434a4106ab54c662860'),
        name: 'Samsung',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('613f248203aeedc44ad3a01f'),
        name: 'Oppo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const products = [
      {
        name: 'iPhone 12',
        description: '',
        price: 20490000,
        color: 'black',
        brand: '613f242d82d0479055e95dcc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPhone 12 Pro Max',
        description: '',
        price: 30990000,
        color: 'white',
        brand: '613f242d82d0479055e95dcc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPhone 11',
        description: '',
        price: 14990000,
        color: 'black',
        brand: '613f242d82d0479055e95dcc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy Z Fold3',
        description: '',
        price: 41990000,
        color: 'black',
        brand: '613f2434a4106ab54c662860',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy A22',
        description: '',
        price: 5390000,
        color: 'blue',
        brand: '613f2434a4106ab54c662860',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy S21+',
        description: '',
        price: 20990000,
        color: 'black',
        brand: '613f2434a4106ab54c662860',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Oppo Reno6 Z',
        description: '',
        price: 9490000,
        color: 'blue',
        brand: '613f248203aeedc44ad3a01f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Oppo A74',
        description: '',
        price: 6690000,
        color: 'blue',
        brand: '613f248203aeedc44ad3a01f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('brands').insertMany(brands);
    await db.collection('products').insertMany(products);
  },

  async down() {
    // TODO write the statements to rollback your migration (if possible)
  },
};
