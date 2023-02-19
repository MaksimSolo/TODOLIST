export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: string,
}

export enum ResponseResultCode {
  OK,
  ERROR = 10
}