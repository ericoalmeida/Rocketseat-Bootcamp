import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';

import AgendamentoModel from '../models/Agendamento';
import UsuarioModel from '../models/Usuario';
import ArquivoModel from '../models/Arquivo';
import Notificacao from '../schemas/notificacao';

import EmailCancelamento from '../jobs/EmailCancelamento';
import BackgroundJobs from '../../lib/BackgroundJobs';

class AgendamentoController {
  async index(req, res) {
    const { pagina = 1 } = req.query;

    const agendamentos = await AgendamentoModel.findAll({
      where: { usuario_id: req.usuario_id, datacancelamento: null },
      order: ['data'],
      attributes: ['id', 'data', 'realizado', 'cancelavel'],
      limit: 20,
      offset: (pagina - 1) * 20,
      include: [
        {
          model: UsuarioModel,
          as: 'usuario',
          attributes: ['id', 'nome'],
          include: [
            {
              model: ArquivoModel,
              as: 'avatar',
              attributes: ['id', 'nome', 'diretorio', 'url'],
            },
          ],
        },
        {
          model: UsuarioModel,
          as: 'provedor',
          attributes: ['id', 'nome'],
          include: [
            {
              model: ArquivoModel,
              as: 'avatar',
              attributes: ['id', 'nome', 'diretorio', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(agendamentos);
  }

  async store(req, res) {
    const esquema = Yup.object().shape({
      provedor_id: Yup.number().required(),
      data: Yup.date().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validacao dos dados.' });
    }

    if (req.usuario_id === req.body.provedor_id) {
      return res
        .status(400)
        .json({ erro: 'Não é possivel abrir um agendamento para si mesmo' });
    }

    const usuarioProvedor = await UsuarioModel.findOne({
      where: { id: req.body.provedor_id, provedor: true },
    });

    if (!usuarioProvedor) {
      return res.status(401).json({
        erro: 'Não é possível criar um agendamento para este usuário.',
      });
    }

    const horarioInicio = startOfHour(parseISO(req.body.data));

    if (isBefore(horarioInicio, new Date())) {
      return res
        .status(400)
        .json({ erro: 'Não é possivel utilizar uma data que já passou.' });
    }

    const horarioIndisponivel = await AgendamentoModel.findOne({
      where: {
        provedor_id: req.body.provedor_id,
        datacancelamento: null,
        data: horarioInicio,
      },
    });

    if (horarioIndisponivel) {
      return res.status(400).json({ erro: 'Este horário ja está reservado' });
    }

    const agendamento = await AgendamentoModel.create({
      usuario_id: req.usuario_id,
      provedor_id: req.body.provedor_id,
      data: horarioInicio,
    });

    const usuario = await UsuarioModel.findByPk(req.usuario_id);
    const dataFormatada = await format(
      horarioInicio,
      "'dia' dd 'de' MMMM', às' HH:mm'h'",
      { locale: pt }
    );

    await Notificacao.create({
      conteudo: `Novo agendamento de ${usuario.nome} para ${dataFormatada}`,
      usuario: req.body.provedor_id,
    });

    return res.json(agendamento);
  }

  async delete(req, res) {
    const agendamento = await AgendamentoModel.findByPk(req.params.id, {
      attributes: ['id', 'data', 'datacancelamento'],
      include: [
        {
          model: UsuarioModel,
          as: 'provedor',
          attributes: ['nome', 'email'],
        },
        {
          model: UsuarioModel,
          as: 'usuario',
          attributes: ['id', 'nome', 'email'],
        },
      ],
    });

    if (req.usuario_id !== agendamento.usuario.id) {
      return res.status(400).json({
        erro: 'Você não têm permissão para cancelar esse agendamento.',
      });
    }

    const horaLimiteCancelamento = subHours(agendamento.data, 2);

    if (isBefore(horaLimiteCancelamento, new Date())) {
      return res
        .status(400)
        .json({ erro: 'Data/Hora limite para cancelamento expirou ' });
    }

    agendamento.datacancelamento = new Date();

    await BackgroundJobs.add(EmailCancelamento.key, {
      agendamento,
    });

    const {
      id,
      data,
      datacancelamento,
      provedor,
      usuario,
    } = await agendamento.save();

    return res.json({ id, data, datacancelamento, provedor, usuario });
  }
}

export default new AgendamentoController();
