import {Tests} from './tests';

export interface Kid {
  id?: string;
  userId: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  tests: Tests;
  summary: number;
}
