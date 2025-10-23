import { SxProps } from '@mui/material'


export const getListItemSx = (): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
})

export const getListItemsSx = (isDone: boolean): SxProps => ({
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? 'line-through' : 'none',
})
