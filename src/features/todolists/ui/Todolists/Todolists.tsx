import {TodolistItem} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {useGetTodolistsQuery} from '@/features/todolists/api/todolistsApi'
import {containerSx} from '@/common/styles';
import {Box} from '@mui/material';
import {TodolistSkeleton} from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton';

export const Todolists = () => {
    const { data: todolists, isLoading } = useGetTodolistsQuery()

    if (isLoading) {
        return (
            <Box sx={containerSx} style={{ gap: "32px" }}>
                {Array(2)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </Box>
        )
    }

    return (
        <>
            {todolists?.map((todolist) => {
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
