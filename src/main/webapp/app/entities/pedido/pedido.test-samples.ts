import dayjs from 'dayjs/esm';

import { IPedido, NewPedido } from './pedido.model';

export const sampleWithRequiredData: IPedido = {
  id: 74389,
  valorPedido: 93818,
};

export const sampleWithPartialData: IPedido = {
  id: 6787,
  dataPedido: dayjs('2020-02-15T05:47'),
  valorPedido: 28975,
};

export const sampleWithFullData: IPedido = {
  id: 97915,
  dataPedido: dayjs('2020-02-15T10:45'),
  valorPedido: 47678,
};

export const sampleWithNewData: NewPedido = {
  valorPedido: 84561,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
