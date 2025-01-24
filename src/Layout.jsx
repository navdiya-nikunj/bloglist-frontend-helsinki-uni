import { useDispatch, useSelector } from 'react-redux'
import Login from './components/auth/Login'
import { useEffect } from 'react'
import { removeNotification } from './store/notification/notificationSlice'
import { logout, setuser } from './store/user/userSlice'
import { NavLink, Outlet } from 'react-router'
import ResponsiveAppBar from './components/ui/NavBar'
import styled from 'styled-components'

const Layout = () => {
    const user = useSelector((state) => state.user)
    const notification = useSelector((state) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        const localstorageuser = localStorage.getItem('User')

        if (localstorageuser) {
            dispatch(setuser(JSON.parse(localstorageuser)))
        }
    }, [])

    useEffect(() => {
        if (notification?.msg) {
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
    }, [notification])

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
                <MainLayout>
                    <ResponsiveAppBar />
                    <Outlet />
                </MainLayout>
            )}
        </>
    )
}

export default Layout

const MainLayout = styled.div`
    background-image: url('/bg2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    max-width: 100vw;
`
