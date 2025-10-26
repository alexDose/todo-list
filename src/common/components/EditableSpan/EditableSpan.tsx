import TextField from '@mui/material/TextField'
import { type ChangeEvent, useState } from 'react'

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)
    const [error, setError] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        if (title.trim()) {
            setIsEditMode(false)
            onChange(title)
            setError(false)
        } else {
            setError(true)
        }
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    return (
        <>
            {isEditMode ? (
                <TextField
                    sx={error && { background: 'rgba(245,206,211,0.84)' }}
                    value={title}
                    size={'small'}
                    onChange={changeTitle}
                    onBlur={turnOffEditMode}
                    autoFocus
                    error={error}
                    label={error ? 'Title is required' : 'Enter title'}
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}
