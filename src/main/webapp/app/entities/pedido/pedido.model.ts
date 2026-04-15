import dayjs from 'dayjs/esm';

export interface IPedido {
  id: number;
  dataPedido?: dayjs.Dayjs | null;
  valorPedido?: number | null;
}

export type NewPedido = Omit<IPedido, 'id'> & { id: null };
