import { DateTime } from "ionic-angular";

// Classe de itens da Ordem de Serviço
export class OrdemServico {

  AT_COD: number;       // código da ordem de serviço
  FL_COD: number;       // código da empresa ou filial emitente da OS
  CF_COD: number;       // cógigo da empresa cliente da OS
  VD_COD: number;       // código do técnico/colaborador atendente
  AT_DATSOL: DateTime;  // data de abertura da solicitação
  AT_DATPRE: DateTime;  // data de previsão de atendimento da solicitação
  CONTATO: string;      // nome do contato
  TELEFONES: string;    // telefones de contato
  ENDEREÇO: string;     // endereço do atendimento da OS
  AT_DES: string;       // descrição resumida da OS
  AT_DETALHE: string;   // detalhes/descrição completa do serviço
  AT_STATUS: string;    // status da OS
  
  // status da OS - query com JOIN desse valor
  AT_STATUS_D =
    this.AT_STATUS === '0' ? 'Não enviada Mobile' : this.AT_STATUS === '1' ? 'Enviada Mobile' :
      this.AT_STATUS === '2' ? 'Em atendimeno' : this.AT_STATUS === '3' ? 'Atendimento finalizado' :
      this.AT_STATUS === '4' ? 'Fechada/Enviada para retaguarda' : 'Cancelada/Finalizada';

  /* Status:
       0 - não enviada para mobile
       1 - enviado para mobile
       2 - em atendimento
       3 - atendimento finalizado, pendente transmissão
       4 - fechado/transmitida
       5 - cancelada / finalizado
   */

}
