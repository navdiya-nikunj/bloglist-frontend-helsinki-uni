import { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import user from '../services/user'

const User = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [search] = useSearchParams()
    const { userId } = useParams()
    useLayoutEffect(() => {
        console.log(userId)
        user.getUser(userId).then((res) => {
            setUserInfo(res)
        })
    }, [])

    return (
        userInfo && (
            <>
                <h1>{userInfo.name}</h1>
                <p>Added Blogs</p>
                <ul>
                    {userInfo.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            </>
        )
    )
}

export default User
