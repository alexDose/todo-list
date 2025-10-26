import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '@/common/hooks'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map((todolist) => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <TodolistItem todolist={todolist} />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}
