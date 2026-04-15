import { ICliente, NewCliente } from './cliente.model';

export const sampleWithRequiredData: ICliente = {
  id: 45820,
  nome: 'Pará',
  cpf: '049.341.439-08',
};

export const sampleWithPartialData: ICliente = {
  id: 59224,
  nome: 'Accounts',
  cpf: '001.937.530-39',
};

export const sampleWithFullData: ICliente = {
  id: 62348,
  nome: 'Agent wireless Qatari',
  cpf: '357.611.633-40',
};

export const sampleWithNewData: NewCliente = {
  nome: 'haptic',
  cpf: '430.948.304-07',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
