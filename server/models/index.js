// server/models/index.js
const { Sequelize } = require('sequelize');
const Estado = require('./Estado');
const Municipio = require('./Municipio');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

const models = {
  Estado: Estado(sequelize),
  Municipio: Municipio(sequelize)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };