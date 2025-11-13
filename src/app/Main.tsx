import { CreateItemForm } from '@/common/components'
import './App.module.css'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi'

export const Main = () => {
    const [addTodolist] = useAddTodolistMutation()

    const createTodolist = (title: string) => {
        addTodolist(title)
    }

    return (
        <>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm addItem={createTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    <Todolists />
                </Grid>
            </Container>
        </>
    )
}
