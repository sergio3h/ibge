const { Municipio } = require('../models');

module.exports = {
  async listarPorEstado(req, res) {
    try {
      const municipios = await Municipio.findAll({
        where: { sigla_uf: req.params.uf },
        attributes: ['nome_municipio'],
        order: [['nome_municipio', 'ASC']]
      });
      
      // Formatando para o formato esperado pelo frontend
      const resultado = municipios.map(municipio => ({
        nome: municipio.nome_municipio
      }));
      
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterGeometria(req, res) {
    try {
      const [result] = await sequelize.query(
        'SELECT * FROM get_municipio_svg($1, $2)',
        {
          replacements: [req.params.uf, req.params.municipio],
          type: sequelize.QueryTypes.SELECT
        }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};