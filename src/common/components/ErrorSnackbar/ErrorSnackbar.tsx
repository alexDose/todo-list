import {SyntheticEvent} from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useAppDispatch, useAppSelector} from '@/common/hooks';
import {selectError, setAppError} from '@/app/app-slice';

export const ErrorSnackbar = () => {

    const dispatch = useAppDispatch()
    const appError = useAppSelector(selectError)

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null))
    }

    return (
        <Snackbar open={appError !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                {appError}
            </Alert>
        </Snackbar>
    )
}
