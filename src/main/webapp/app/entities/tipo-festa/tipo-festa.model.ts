export interface ITipoFesta {
  id: number;
  nome?: string | null;
  descricao?: string | null;
}

export type NewTipoFesta = Omit<ITipoFesta, 'id'> & { id: null };
