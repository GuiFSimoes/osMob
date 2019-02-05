// import { DateTime } from "ionic-angular";

// Classe de itens da Ordem de Serviço
export class FotoOrdemServico {

  AT_COD: number;        // código da ordem de serviço
  FL_COD: number;        // código da empresa ou filial emitente da OS
  AT_ITM: number;        // código de ordem da foto 
  ATR_FOTO: string;      // foto (link ou base64?)
  AT_COMENTARIO: string; // comentário na foto
  AT_DATA: string;     // data que a foto foi tirada (ou adicionada)
  AT_LOCAL: string;      // coordenadas da foto/imagem (latitude,longitude)

}
