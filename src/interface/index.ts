export interface signIn {
  email: string;
  password: string;
}

export interface signUp {
  name: string;
  email: string;
  password: string;
}

export interface userInfos {
  curPassword: string;
  password: string;
  accessToken: string;
}

export interface accessToken {
  accessToken: string;
}
