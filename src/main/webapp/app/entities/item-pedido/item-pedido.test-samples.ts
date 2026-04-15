import { IItemPedido, NewItemPedido } from './item-pedido.model';

export const sampleWithRequiredData: IItemPedido = {
  id: 99459,
  nomeItem: 'withdrawal',
};

export const sampleWithPartialData: IItemPedido = {
  id: 58868,
  nomeItem: 'Balboa dourado revolutionary',
};

export const sampleWithFullData: IItemPedido = {
  id: 60706,
  nomeItem: 'parsing Account',
  valorItem: 37819,
};

export const sampleWithNewData: NewItemPedido = {
  nomeItem: 'override',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
