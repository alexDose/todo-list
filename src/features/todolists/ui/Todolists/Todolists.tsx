import {TodolistItem} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {fetchTodolistsTC, selectTodolists} from '@/features/todolists/model/todolists-slice';
import {useEffect} from 'react';

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

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
