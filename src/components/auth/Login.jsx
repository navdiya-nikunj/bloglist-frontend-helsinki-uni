import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/user/userSlice'

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
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            className="loginform"
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '30%',
                    height: '30%',
                    justifyContent: 'space-around',
                    border: '1px solid black',
                    padding: 10,
                }}
            >
                <label htmlFor="Username">Username:</label>
                <input
                    type="text"
                    name="Username"
                    data-testid="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <label htmlFor="Password">Password:</label>
                <input
                    data-testid="password"
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login
