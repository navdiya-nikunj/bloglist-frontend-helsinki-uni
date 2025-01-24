import { useLayoutEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import user from '../../services/user'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Link } from '@mui/icons-material'

const Users = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useLayoutEffect(() => {
        user.getusers().then((res) => {
            setUsers(res)
        })
    }, [])

    return (
        users.length != 0 && (
            <Container
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '10px 10px 5px',
                    padding: '10px',
                    marginTop: '10px',
                }}
            >
                <Typography component={'h1'} variant="h3" color="primary">
                    Users
                </Typography>

                <Box sx={{ height: 250, width: '100%' }}>
                    <DataGrid
                        columns={[
                            { field: 'Username', width: '400' },
                            { field: 'Blogs', width: '400' },
                            {
                                field: 'Action',
                                width: '400',
                                type: 'actions',
                                headerName: 'Actions',
                                getActions: ({ id }) => {
                                    return [
                                        <GridActionsCellItem
                                            icon={<Link />}
                                            label="View"
                                            sx={{
                                                color: 'primary.main',
                                            }}
                                            onClick={() => {
                                                navigate(`/user/${id}`)
                                            }}
                                        />,
                                    ]
                                },
                            },
                        ]}
                        rows={users.map((user) => {
                            return {
                                id: user.id,
                                Username: user.name,
                                Blogs: user?.blogs.length,
                            }
                        })}
                    />
                </Box>
            </Container>
        )
    )
}

export default Users
