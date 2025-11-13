import {selectStatus, selectThemeMode, setIsLoggedIn} from '@/app/app-slice'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {getTheme} from '@/common/theme'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginInputs, loginSchema} from '@/features/auth/lib/schemas'
import {useLoginMutation} from '@/features/auth/api/authApi'
import {ResultCode} from '@/common/enum'
import {AUTH_TOKEN} from '@/common/constats'

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const isLoading = useAppSelector(selectStatus)
    const [login] = useLoginMutation()

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    })

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        const res = await login(data)
        if (res.data.resultCode === ResultCode.Success) {
            if (data.rememberMe) {
                localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            }
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            reset()
        }
    }

    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                                href="https://social-network.samuraijs.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            error={!!errors.email}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Incorrect email address',
                                },
                            })}
                        />
                        <TextField type="password" label="Password" margin="normal" {...register('password')} />
                        <FormControlLabel
                            label="Remember me"
                            control={
                                <Controller
                                    name={'rememberMe'}
                                    control={control}
                                    render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                                />
                            }
                        />
                        <Button disabled={isLoading === 'loading'} type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    )
}
