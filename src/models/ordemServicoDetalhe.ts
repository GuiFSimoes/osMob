import { DateTime } from "ionic-angular";

// Classe de itens da Ordem de Serviço
export class OrdemServicoDetalhe {

  AT_COD: number;        // código da ordem de serviço
  FL_COD: number;        // código da empresa ou filial emitente da OS
  AT_ITM: number;        // código de ordem do atendimento 
  ATR_COD: number;       // Codigo da fase
  CF_COD: number;        // cógigo da empresa cliente da OS
  VD_COD: number;        // código do técnico/colaborador atendente
  AT_DATINI: DateTime;   // data de início do atendimento da fase
  AT_DATFIM: DateTime;   // data de fim do atendimento da fase
  AT_COMENTARIO: string; // comentário do atendimento da fase
  ATR_DISTANCIA: string; // distância percorida

}
