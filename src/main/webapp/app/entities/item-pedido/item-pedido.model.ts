import { IPedido } from 'app/entities/pedido/pedido.model';

export interface IItemPedido {
  id: number;
  nomeItem?: string | null;
  valorItem?: number | null;
  pedido?: Pick<IPedido, 'id'> | null;
}

export type NewItemPedido = Omit<IItemPedido, 'id'> & { id: null };
