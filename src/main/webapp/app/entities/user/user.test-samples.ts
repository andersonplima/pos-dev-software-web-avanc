import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 24814,
  login: 'Norberto_Braga',
};

export const sampleWithPartialData: IUser = {
  id: 966,
  login: 'Alessandro_Reis',
};

export const sampleWithFullData: IUser = {
  id: 5440,
  login: 'Benicio.Macedo17',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
