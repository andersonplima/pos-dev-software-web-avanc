import { ICliente, NewCliente } from './cliente.model';

export const sampleWithRequiredData: ICliente = {
  id: 2897,
  nome: 'wherever alongside per',
  cpf: '733.962.047-33',
};

export const sampleWithPartialData: ICliente = {
  id: 29421,
  nome: 'finding',
  cpf: '310.096.158-03',
};

export const sampleWithFullData: ICliente = {
  id: 17129,
  nome: 'circumference',
  cpf: '454.282.310-20',
};

export const sampleWithNewData: NewCliente = {
  nome: 'under',
  cpf: '080.416.431-33',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
