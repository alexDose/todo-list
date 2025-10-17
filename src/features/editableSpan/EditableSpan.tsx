import {ChangeEvent, useState} from 'react';
import {KeyboardEvent} from 'react/index';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    value: string
    changeTitle: (title: string) => void
    className?: string
}

export const EditableSpan = ({value, changeTitle, className}: EditableSpanType) => {
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(value)
    const [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError('')
    }
    const changeTitleHandler = () => {
        if (inputValue.trim() !== '') {
            changeTitle(inputValue)
            setEditMode(false)
        } else {
            setError(`Title can't be empty`)
        }
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeTitleHandler()
        }
    }

    return <>
        {isEditMode
            ? <TextField error={error}
                         size={'small'}
                         onKeyDown={onKeyDownHandler}
                         autoFocus
                         onBlur={changeTitleHandler}
                         onChange={onChangeHandler}
                         value={inputValue}
                         helperText={error ? error : ''}
            />
            : <span className={className} onDoubleClick={onEditMode}>{value}</span>}
    </>
}
