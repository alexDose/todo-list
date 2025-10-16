import {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    value: string
    error: string
    setValue: (value: string) => void
    onKeyDown: () => void
}

export const Input = ({setValue, error, value, onKeyDown}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onKeyDown()
        }
    }

    return <>
        <input className={error ? 'error' : ''}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               value={value}/>
    </>
}
