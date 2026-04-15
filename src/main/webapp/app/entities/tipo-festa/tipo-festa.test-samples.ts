import { ITipoFesta, NewTipoFesta } from './tipo-festa.model';

export const sampleWithRequiredData: ITipoFesta = {
  id: 27946,
  nome: 'scope openly by',
  descricao: 'unibody gadzooks',
};

export const sampleWithPartialData: ITipoFesta = {
  id: 2277,
  nome: 'afraid',
  descricao: 'tabulate murky boo',
};

export const sampleWithFullData: ITipoFesta = {
  id: 4561,
  nome: 'kowtow geez',
  descricao: 'mispronounce critical than',
};

export const sampleWithNewData: NewTipoFesta = {
  nome: 'pfft',
  descricao: 'beyond less grounded',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
