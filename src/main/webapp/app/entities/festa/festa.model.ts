import { ICliente } from 'app/entities/cliente/cliente.model';
import { ITipoFesta } from 'app/entities/tipo-festa/tipo-festa.model';

export interface IFesta {
  id: number;
  nome?: string | null;
  tema?: string | null;
  valor?: number | null;
  tipoFesta?: Pick<ITipoFesta, 'id' | 'nome'> | null;
  cliente?: Pick<ICliente, 'id' | 'cpf'> | null;
}

export type NewFesta = Omit<IFesta, 'id'> & { id: null };
