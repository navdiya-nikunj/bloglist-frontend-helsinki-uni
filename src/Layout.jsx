import { useDispatch, useSelector } from 'react-redux'
import Login from './components/auth/Login'
import { useEffect } from 'react'
import { removeNotification } from './store/notification/notificationSlice'
import { logout, setuser } from './store/user/userSlice'
import { NavLink, Outlet } from 'react-router'

const Layout = () => {
    const user = useSelector((state) => state.user)
    const notification = useSelector((state) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        const localstorageuser = localStorage.getItem('User')
        console.log(localstorageuser)
        if (localstorageuser) {
            dispatch(setuser(JSON.parse(localstorageuser)))
        }
    }, [])

    useEffect(() => {
        if (notification?.msg) {
            console.log(notification)
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
    }, [notification])

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
        <>
            {notification?.msg && (
                <div
                    className="error"
                    style={{
                        padding: 5,
                        border: `1px solid ${notification.color}`,
                        backgroundColor: 'gray',
                    }}
                >
                    <p style={{ color: `${notification.color}` }}>
                        {notification.msg}
                    </p>
                </div>
            )}
            {!user ? (
                <Login />
            ) : (
                <>
                    <nav>
                        <NavLink to={'/'}>Blogs</NavLink>
                        <NavLink to={'/users'}>Users</NavLink>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <p style={{ textAlign: 'center' }}>
                                {user.name} is logged in{' '}
                            </p>
                            <button onClick={handleLogOut}>Logout</button>
                        </div>
                    </nav>
                    <Outlet />
                </>
            )}
        </>
    )
}

export default Layout
