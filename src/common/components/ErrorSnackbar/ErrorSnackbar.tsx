import {Slide} from "@mui/material";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {appActions} from "app/model/slice/appSlice";
import {useAppSelector} from "app/store/store";
import {useDispatch} from "react-redux";
import * as React from 'react';
import * as appSelectors from "app/model/selectors/app.selectors"


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const dispatch = useDispatch()
  const error = useAppSelector<string | null>(appSelectors.error)
  const open = error !== null

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(appActions.setAppError({error: null}))
  };

  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
      <Slide direction="down">
        <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
          {error}
        </Alert>
      </Slide>
    </Snackbar>
  );
}
