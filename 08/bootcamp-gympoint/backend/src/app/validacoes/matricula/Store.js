import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const esquema = Yup.object().shape({
      aluno_id: Yup.number().required(),
      plano_id: Yup.number().required(),
      data_inicio: Yup.date().required(),
    });

    await esquema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({
      erro: 'Falha durante a validação dos dados',
      messages: error.inner,
    });
  }
};
