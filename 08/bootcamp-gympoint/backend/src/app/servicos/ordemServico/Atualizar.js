import OrdemServicosModel from '../../Models/OrdemServicos';
import AlunoModel from '../../Models/Aluno';
import TipoOrdemServicosModel from '../../Models/TipoOrdemServicos';

import EmailRetornoSolicitacao from '../../Jobs/EmailRetornoSolicitacao';
import BackgroundJobs from '../../../lib/BackgroundJobs';

class Atualizar {
  async run({ ordemServico_id, retorno }) {
    const ordemServico = await OrdemServicosModel.findByPk(ordemServico_id);

    if (!ordemServico) {
      throw new Error('Ordem de serviço não econtrado');
    }

    const resolvido = true;

    await ordemServico.update({
      retorno,
      resolvido,
      data_retorno: new Date(),
    });

    const ordemServicoAtualizada = await OrdemServicosModel.findByPk(
      ordemServico.id,
      {
        attributes: [
          'id',
          'solicitacao',
          'retorno',
          'createdAt',
          'data_retorno',
          'resolvido',
        ],
        include: [
          {
            model: AlunoModel,
            as: 'aluno',
            attributes: ['id', 'nome', 'email'],
          },
          {
            model: TipoOrdemServicosModel,
            as: 'tipo_ordem',
            attributes: ['id', 'descricao'],
          },
        ],
      }
    );

    await BackgroundJobs.add(
      EmailRetornoSolicitacao.key,
      ordemServicoAtualizada
    );

    return ordemServicoAtualizada;
  }
}

export default new Atualizar();
