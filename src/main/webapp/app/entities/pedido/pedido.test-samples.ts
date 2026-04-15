import dayjs from 'dayjs/esm';

import { IPedido, NewPedido } from './pedido.model';

export const sampleWithRequiredData: IPedido = {
  id: 18617,
  valorPedido: 26259.3,
};

export const sampleWithPartialData: IPedido = {
  id: 7853,
  dataPedido: dayjs('2020-02-15T01:46'),
  valorPedido: 32256.53,
};

export const sampleWithFullData: IPedido = {
  id: 29823,
  dataPedido: dayjs('2020-02-15T07:37'),
  valorPedido: 29572.93,
};

export const sampleWithNewData: NewPedido = {
  valorPedido: 23489.45,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
