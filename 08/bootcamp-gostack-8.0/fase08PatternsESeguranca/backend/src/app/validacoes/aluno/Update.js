import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const esquema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string(),
      altura: Yup.number(),
      idade: Yup.number(),
      peso: Yup.number(),
    });

    await esquema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({
      erro: 'Falha durante a validação dos dados.',
      messages: error.inner,
    });
  }
};
