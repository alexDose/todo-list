import {Button} from '../button/Button';
import {useState} from 'react';
import {Input} from '../../Input';


type PropsType = {
    onClick: (value: string) => void
}

export const FullInput = ({onClick}: PropsType) => {
    const [error, setError] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const onClickHandler = () => {
        if(value.trim() !== '') {
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


    return (
        <div>
            <Input onKeyDown={onKeyDown} value={value} error={error} setValue={setValueHandler}/>
            <Button title={'+'} onClick={onClickHandler}/>
            <div className={'error-message'}>{error}</div>
        </div>
    )
}
