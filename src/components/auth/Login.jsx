import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/user/userSlice'
import { LoginContainer, LoginlayoutBg } from '../../styles/auth/loginStyles'
import { Button, TextField } from '@mui/material'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(loginUser(username, password))
        } catch (e) {
            console.log(e)
            dispatch(
                showNotification({
                    msg: 'wrong username or password',
                    color: 'red',
                })
            )
        }
    }
    return (
        <LoginlayoutBg>
            <LoginContainer onSubmit={handleSubmit}>
                <TextField
                    id="filled-basic"
                    label="Username"
                    variant="filled"
                    type="text"
                    name="Username"
                    data-testid="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    style={{
                        margin: '1.5rem 0',
                    }}
                />
                <TextField
                    id="filled-basic"
                    label="Password"
                    variant="filled"
                    data-testid="password"
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    style={{
                        margin: '1.5rem 0',
                    }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    style={{
                        margin: '1.5rem 0',
                    }}
                >
                    Submit
                </Button>
            </LoginContainer>
        </LoginlayoutBg>
    )
}

export default Login
