import { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import user from '../../services/user'
import { Box, Container, Typography } from '@mui/material'
import { BorderTop } from '@mui/icons-material'

const User = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [search] = useSearchParams()
    const { userId } = useParams()
    useLayoutEffect(() => {
        user.getUser(userId).then((res) => {
            setUserInfo(res)
        })
    }, [])

    return (
        userInfo && (
            <Container
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '10px 10px 5px',
                    padding: '10px',
                    marginTop: '10px',
                }}
            >
                <Typography component={'h1'} variant="h3" color="primary">
                    {' '}
                    {userInfo.name}
                </Typography>
                <Box
                    sx={{
                        borderTop: '1px solid gray',
                        padding: '10px',
                        marginTop: '10px',
                    }}
                >
                    {userInfo?.blogs.length === 0 ? (
                        <Typography variant="caption">
                            No blogs created
                        </Typography>
                    ) : (
                        <ul>
                            {userInfo.blogs.map((blog) => (
                                <li key={blog.id}>{blog.title}</li>
                            ))}
                        </ul>
                    )}
                </Box>
            </Container>
        )
    )
}

export default User
