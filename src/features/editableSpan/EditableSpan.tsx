import {ChangeEvent, useState} from 'react';
import {KeyboardEvent} from 'react/index';

type EditableSpanType = {
    value: string
    changeTitle: (title: string) => void
    className?: string
}

export const EditableSpan = ({value, changeTitle, className}: EditableSpanType) => {
    const [isEditMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const changeTitleHandler = () => {
        changeTitle(inputValue)
        setEditMode(false)
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
            ? <input onKeyDown={onKeyDownHandler} autoFocus onBlur={changeTitleHandler} onChange={onChangeHandler}
                     value={inputValue} type="text"/>
            : <span className={className} onDoubleClick={onEditMode}>{value}</span>}
    </>
}
