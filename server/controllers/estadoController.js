const { Estado } = require('../models');

module.exports = {
  async listarEstados(req, res) {
    try {
      const estados = await Estado.findAll({
        attributes: ['sigla', 'nome'],
        order: [['nome', 'ASC']]
      });
      
      // Formatando para o formato esperado pelo frontend
      const resultado = estados.map(estado => ({
        uf: estado.sigla,
        nome: estado.nome
      }));
      
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};