import { of } from 'rxjs';
import { PaDataTypes } from '../services/padata-types.enum';
import { mockProgram } from './api.program.mock';

export const MockPaDataService = {
  type: PaDataTypes,
  myPrograms: {},
  authenticationState$: of(false),
  getUsername: () => Promise.resolve(''),
  setCurrentProgramId: () => {},
  getCurrentProgram: () => Promise.resolve(mockProgram),
  saveAnswers: () => Promise.resolve(''),
  store: () => Promise.resolve(''),
  retrieve: () => Promise.resolve(''),
  createAccount: () => Promise.resolve(''),
};
