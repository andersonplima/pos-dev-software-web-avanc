import { IFesta } from 'app/shared/model/festa.model';

export interface ICliente {
  id?: number;
  nome?: string;
  cpf?: string;
  festas?: IFesta[];
}

export class Cliente implements ICliente {
  constructor(public id?: number, public nome?: string, public cpf?: string, public festas?: IFesta[]) {}
}
