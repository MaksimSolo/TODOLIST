import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useAppSelector} from "app/store/store";
import {useLogin} from "features/auth/lib/useLogin";
import * as authSelectors from "features/auth/model/selectors/auth.selectors"
import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";


export const Login = () => {

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedIn)
  const {formik} = useLogin();

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn, navigate])

  return (
    <Grid container justifyContent={'center'}>
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
                && <div style={{color: 'fuchsia'}}>{formik.errors.email}</div>}
              <TextField type="password" label="Password"
                         margin="normal" {...formik.getFieldProps('password')}/>
              {formik.touched.password
                && formik.errors.password
                && <div style={{color: 'fuchsia'}}>{formik.errors.password}</div>}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                   checked={formik.values.rememberMe}/>}/>
              <Button type={'submit'} variant={'contained'} color={'primary'}
                      disabled={!!Object.keys(formik.errors).length}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
};

