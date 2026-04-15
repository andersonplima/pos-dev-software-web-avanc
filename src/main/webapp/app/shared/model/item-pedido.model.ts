export interface IItemPedido {
  id?: number;
  nomeItem?: string;
  valorItem?: number;
  pedidoId?: number;
}

export class ItemPedido implements IItemPedido {
  constructor(public id?: number, public nomeItem?: string, public valorItem?: number, public pedidoId?: number) {}
}
