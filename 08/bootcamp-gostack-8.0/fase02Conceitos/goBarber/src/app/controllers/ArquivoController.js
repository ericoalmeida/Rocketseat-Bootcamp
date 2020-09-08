import ArquivoModel from '../models/Arquivo';

class ArquivoController {
  async store(req, res) {
    const { originalname: nome, filename: diretorio } = req.file;

    const arquivo = await ArquivoModel.create({ nome, diretorio });

    return res.json(arquivo);
  }
}

export default new ArquivoController();
