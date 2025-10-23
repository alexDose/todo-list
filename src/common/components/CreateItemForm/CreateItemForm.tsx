import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        if (title.trim().length !== 0) {
            onCreateItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }
    const onBlurHandler = () => {
        setError(null)
    }
    return (
        <div>
            <TextField
                label={!error ? 'Enter a title' : 'Error'}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
                onBlur={onBlurHandler}
            />
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}
