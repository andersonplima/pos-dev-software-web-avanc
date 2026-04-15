import { ITipoFesta, NewTipoFesta } from './tipo-festa.model';

export const sampleWithRequiredData: ITipoFesta = {
  id: 51205,
  nome: 'auxiliary',
  descricao: 'interactive',
};

export const sampleWithPartialData: ITipoFesta = {
  id: 20392,
  nome: 'channels',
  descricao: 'backing',
};

export const sampleWithFullData: ITipoFesta = {
  id: 31219,
  nome: 'transmitting heuristic',
  descricao: 'Mônaco Lustroso Account',
};

export const sampleWithNewData: NewTipoFesta = {
  nome: 'Account Mercearia',
  descricao: 'synthesizing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
