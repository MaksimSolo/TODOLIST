import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {Slide} from "@mui/material";
import {useAppSelector} from "../../store/store";
import {setAppErrorAC} from "../../store/app-reducer";
import {useDispatch} from "react-redux";

function TransitionDown(props: any) {
    return <Slide {...props} direction="down"/>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const error = useAppSelector<string | null>(state => state.app.error)
    const open = error !== null

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} TransitionComponent={TransitionDown}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
