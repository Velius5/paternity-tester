export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  createdAt: number;
  source: UserSource;
}

export enum UserSource {
  DIRECT = 'DIRECT',
  GOOGLE = 'GOOGLE'
}
