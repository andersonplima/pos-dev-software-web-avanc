import { Moment } from 'moment';

export interface IPedido {
  id?: number;
  dataPedido?: Moment;
  valorPedido?: number;
}

export class Pedido implements IPedido {
  constructor(public id?: number, public dataPedido?: Moment, public valorPedido?: number) {}
}
