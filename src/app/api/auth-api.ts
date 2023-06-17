import {instance} from "app/api/config/config";
import {BaseResponseType, LoginParamsType} from "common/types/types";

export const authAPI = {
  login: (loginParams: LoginParamsType) => {
    return instance.post<BaseResponseType<{ userId: number }>>('/auth/login', loginParams);
  },
  me: () => {
    return instance.get<BaseResponseType>('/auth/me',)
  },
  logout: () => {
    return instance.delete<BaseResponseType>('/auth/login')
  }
}

