import Button from '@mui/material/Button'
import { FilterValues } from '@/features/todolists/model/todolists-slice'

type PropsType = {
    title: string
    onClick: () => void
    filter?: FilterValues
}

export const ButtonMUI = ({ title, onClick, filter }: PropsType) => {
    return (
        <Button
            size={'small'}
            variant={filter && filter === title.toLowerCase() ? 'contained' : 'outlined'}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}
