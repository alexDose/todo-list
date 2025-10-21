import Button from '@mui/material/Button';
import {FilterValue} from '../todolist/Todolist';

type PropsType = {
    title: string
    onClick: () => void
    filter?: FilterValue
}

export const ButtonMUI = ({title, onClick, filter}: PropsType) => {
    return <Button size={'small'}
                   variant={filter
                       ? filter === title.toLowerCase() ? 'contained' : 'outlined'
                       : 'outlined'
                   }
                   onClick={onClick}>{title}</Button>
}
