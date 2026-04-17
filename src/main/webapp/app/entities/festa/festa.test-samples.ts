import { IFesta, NewFesta } from './festa.model';

export const sampleWithRequiredData: IFesta = {
  id: 7683,
  nome: 'chainstay',
  tema: 'intensely terrible',
  valor: 29551.97,
};

export const sampleWithPartialData: IFesta = {
  id: 1948,
  nome: 'owlishly',
  tema: 'through generally but',
  valor: 29661.18,
};

export const sampleWithFullData: IFesta = {
  id: 2187,
  nome: 'yahoo modulo',
  tema: 'yahoo beneath',
  valor: 10193.13,
};

export const sampleWithNewData: NewFesta = {
  nome: 'pip pace',
  tema: 'finally lest warmly',
  valor: 9284.04,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
