import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik,} from "formik";

type FormikErrorType = {
    email?: string,
    password?: string,
}
export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = '🤣 Dumb! E-mail required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = '🤣 Invalid email address';
            }

            if (!values.password) {
                errors.password = '🤣 Dumb! You even forgot your password';
            } else if (values.password.length > 10 || values.password.length < 6) {
                errors.password = '🤣 must be more than 6 characters but less than 10';
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
            formik.resetForm();
        }
    })


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
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                          name='rememberMe'
                                          onChange={formik.handleChange} value={formik.values.rememberMe}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>

};

