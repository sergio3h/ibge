// server/models/Estado.js
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Estado = sequelize.define('estados', {
    sigla: {
      type: Sequelize.STRING(2),
      primaryKey: true,
      field: 'sigla'
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'nome'
    }
  }, {
    tableName: 'estados',
    timestamps: false
  });

  Estado.associate = (models) => {
    Estado.hasMany(models.Municipio, {
      foreignKey: 'sigla_uf',
      sourceKey: 'sigla'
    });
  };

  return Estado;
};