// server/models/Municipio.js
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Municipio = sequelize.define('Municipio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'id'
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'nome_municipio'
    },
    sigla_uf: {
      type: Sequelize.STRING(2),
      allowNull: false,
      field: 'sigla_uf'
    }
  }, {
    tableName: 'municipios_2024',
    timestamps: false
  });

  Municipio.associate = (models) => {
    Municipio.belongsTo(models.Estado, {
      foreignKey: 'sigla_uf',
      targetKey: 'sigla'
    });
  };

  return Municipio;
};