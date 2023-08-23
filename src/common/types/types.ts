export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: string,
}

export enum ResultCode {
  OK,
  ERROR = 10
}

export type BaseResponseType<T = {}> = {
  resultCode: number
  messages: string[],
  data: T
  fieldsErrors: FieldError[]
}

type FieldError = {
  field: string
  error: string
}
