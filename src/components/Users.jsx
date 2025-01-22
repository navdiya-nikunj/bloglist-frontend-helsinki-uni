import { useLayoutEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import user from '../services/user'

const Users = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useLayoutEffect(() => {
        user.getusers().then((res) => {
            console.log(res)
            setUsers(res)
        })
    }, [])

    return (
        users.length != 0 && (
            <>
                <h1>Users</h1>
                <table>
                    <thead>
                        <tr>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 'large',
                                }}
                            >
                                Name:
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 'large',
                                }}
                            >
                                Blogs Created
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <NavLink to={`/user/${user.id}`}>
                                            {user?.name}
                                        </NavLink>
                                    </td>
                                    <td>{user?.blogs.length}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    )
}

export default Users
