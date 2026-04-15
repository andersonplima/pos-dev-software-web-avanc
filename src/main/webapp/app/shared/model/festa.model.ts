export interface IFesta {
  id?: number;
  nome?: string;
  tema?: string;
  valor?: number;
  tipoFestaNome?: string;
  tipoFestaId?: number;
  clienteCpf?: string;
  clienteId?: number;
}

export class Festa implements IFesta {
  constructor(
    public id?: number,
    public nome?: string,
    public tema?: string,
    public valor?: number,
    public tipoFestaNome?: string,
    public tipoFestaId?: number,
    public clienteCpf?: string,
    public clienteId?: number
  ) {}
}
