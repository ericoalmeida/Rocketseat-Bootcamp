import FileModel from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname, filename } = req.file;

    const file = await FileModel.create({ name: originalname, path: filename });

    return res.json(file);
  }
}

export default new FileController();
