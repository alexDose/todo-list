import Button from '@mui/material/Button';
import {FilterValue} from '../todolist/Todolist';

type PropsType = {
    title: string
    onClick: () => void
    filter?: FilterValue
}

const Button = ({title, onClick, filter}: PropsType) => {
    const ToUppercaseName = () => {
        return (title[0].toUpperCase() + title.slice(1, title.length))
    }

    return <Button size={'small'}
                   variant={filter
                       ? filter === ToUppercaseName() ? 'contained' : 'outlined'
                       : 'outlined'
                   }
                   onClick={onClick}>{title}</Button>
}
