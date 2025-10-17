import {useState} from 'react';
import {Input} from '../../Input';
import Button from '@mui/material/Button';

type PropsType = {
    onClick: (value: string) => void
}

export const FullInput = ({onClick}: PropsType) => {
    const [error, setError] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const onClickHandler = () => {
        if (value.trim() !== '') {
            onClick(value)
            setValue('')
        } else {
            setError('Title is required!')
        }
    }
    const setValueHandler = (value: string) => {
        setValue(value)
        setError('')

    }
    const onKeyDown = () => {
        onClickHandler()
    }
    const setNoError = () => {
        setError('')
    }


    return (
        <div>
            <Input setNoError={setNoError} onKeyDown={onKeyDown} value={value} error={error} setValue={setValueHandler}/>
            <Button onClick={onClickHandler} size={'small'} variant="contained">+</Button>
        </div>
    )
}
