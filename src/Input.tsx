import {ChangeEvent, KeyboardEvent} from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
    value: string
    error: string
    setValue: (value: string) => void
    onKeyDown: () => void
    setNoError: () => void
}

export const Input = ({setValue, error, value, onKeyDown, setNoError}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }
    const onBlurHandler = () => {
            setNoError()
        }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onKeyDown()
        }
    }

    return <>
        <TextField
            size={'small'}
            label={!error ? 'Enter a title' : 'Error'}
            error={error}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            value={value}
            helperText={error ? error : ''}
            onBlur={onBlurHandler}
        />
    </>
}
