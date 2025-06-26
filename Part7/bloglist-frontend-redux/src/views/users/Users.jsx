import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Routes, Route } from 'react-router-dom'
import SingleUser from './SingleUser'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)

  //

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Users</strong>
            </TableCell>
            <TableCell>
              <strong>Blogs created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`} element={<SingleUser />}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
