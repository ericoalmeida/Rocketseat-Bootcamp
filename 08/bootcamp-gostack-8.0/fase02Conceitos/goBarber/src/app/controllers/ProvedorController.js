import UsuarioModel from '../models/Usuario';
import ArquivoModel from '../models/Arquivo';

class ProvedorController {
  async index(req, res) {
    const provedor = await UsuarioModel.findAll({
      where: { provedor: true },
      attributes: ['id', 'nome', 'email'],
      include: [
        {
          model: ArquivoModel,
          as: 'avatar',
          attributes: ['id', 'nome', 'diretorio', 'url'],
        },
      ],
    });

    return res.json(provedor);
  }
}

export default new ProvedorController();
