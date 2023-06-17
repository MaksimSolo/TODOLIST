import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {authThunk} from "app/store/reducers/auth-reducer";
import {useAppSelector} from "app/store/store";
import {LoginParamsType} from "common/types/types";
import {useFormik,} from "formik";
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as authSelectors from "./../../store/selectors/auth.selectors"


export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedIn)

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
    onSubmit: values => {
      dispatch(authThunk.login(values));
      formik.resetForm();
    }
  })

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn, navigate])

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'} rel="noreferrer"> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
            {formik.touched.email
              && formik.errors.email
              && <div style={{color: 'purple'}}>{formik.errors.email}</div>}
            <TextField type="password" label="Password"
                       margin="normal" {...formik.getFieldProps('password')}/>
            {formik.touched.password
              && formik.errors.password
              && <div style={{color: 'purple'}}>{formik.errors.password}</div>}
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                 checked={formik.values.rememberMe}/>}/>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>

};

