import { IItemPedido, NewItemPedido } from './item-pedido.model';

export const sampleWithRequiredData: IItemPedido = {
  id: 19308,
  nomeItem: 'how behind',
};

export const sampleWithPartialData: IItemPedido = {
  id: 11241,
  nomeItem: 'quicker',
};

export const sampleWithFullData: IItemPedido = {
  id: 17748,
  nomeItem: 'monocromático',
  valorItem: 14257.56,
};

export const sampleWithNewData: NewItemPedido = {
  nomeItem: 'doce',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
