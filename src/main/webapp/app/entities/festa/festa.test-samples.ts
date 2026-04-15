import { IFesta, NewFesta } from './festa.model';

export const sampleWithRequiredData: IFesta = {
  id: 86994,
  nome: 'Consultant Pequeno',
  tema: 'Future-proofed calculating',
  valor: 72933,
};

export const sampleWithPartialData: IFesta = {
  id: 62713,
  nome: 'synthesize Paraíba',
  tema: 'Intranet Sapatos',
  valor: 5131,
};

export const sampleWithFullData: IFesta = {
  id: 86931,
  nome: 'circuit deposit Lead',
  tema: 'Janeiro',
  valor: 36922,
};

export const sampleWithNewData: NewFesta = {
  nome: 'payment',
  tema: 'Automotivo',
  valor: 77624,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
