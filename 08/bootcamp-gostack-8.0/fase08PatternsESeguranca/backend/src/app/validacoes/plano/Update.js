import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const esquema = Yup.object().shape({
      titulo: Yup.string(),
      duracao: Yup.number(),
      preco: Yup.number(),
    });

    await esquema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({
      erro: 'Falha durante a validção dos dados',
      messages: error.inner,
    });
  }
};
