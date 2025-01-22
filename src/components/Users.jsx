import { useEffect, useLayoutEffect, useState } from 'react'
import login from '../services/login'

const Users = () => {
    const [users, setUsers] = useState([])

    useLayoutEffect(() => {
        login.getusers().then((res) => {
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
                                    <td>{user?.name}</td>
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
