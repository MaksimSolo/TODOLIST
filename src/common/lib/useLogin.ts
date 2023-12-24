import {authThunks} from "features/auth/reducers/auth-reducer";
import {useActions} from "common/hooks/useActions";
import {BaseResponseType, LoginParamsType} from "common/types/types";
import {FormikHelpers, useFormik} from "formik";

export const useLogin = ()  => {
  const {login} = useActions(authThunks)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: values => {
      const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {}; //Partial говорит о том что мы применяем здесь элементы типа LoginParams, а не отдельный тип
      if (!values.email) {
        errors.email = '😎 E-mail required!';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '😎 Invalid email address';
      }

      if (!values.password) {
        errors.password = '😎 Enter your password!';
      } else if (values.password.length > 10 || values.password.length < 4) {
        errors.password = '😎 must be more than 4 characters but less than 10';
      }
      return errors;
    },
    onSubmit: (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          const {fieldsErrors} = reason
          !!fieldsErrors && fieldsErrors.map(
            ({field, error}) => formikHelpers.setFieldError(field, error))
        })
    }
  })

  return {formik}
}