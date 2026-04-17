import { ITipoFesta, NewTipoFesta } from './tipo-festa.model';

export const sampleWithRequiredData: ITipoFesta = {
  id: 27946,
  nome: 'programar openly by',
  descricao: 'universidade gadzooks',
};

export const sampleWithPartialData: ITipoFesta = {
  id: 2277,
  nome: 'afiado',
  descricao: 'subir introvertido boo',
};

export const sampleWithFullData: ITipoFesta = {
  id: 4561,
  nome: 'examinar geez',
  descricao: 'girar chato than',
};

export const sampleWithNewData: NewTipoFesta = {
  nome: 'pfft',
  descricao: 'beyond less estreito',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
