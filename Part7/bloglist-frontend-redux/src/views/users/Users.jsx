import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Routes, Route } from 'react-router-dom'
import SingleUser from './SingleUser'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)

  //
  const blogNumbers = blogs.reduce((acc, blog) => {
    if (!acc[blog.user.name]) {
      acc[blog.user.name] = {
        id: blog.user.id,
        blogCount: 1,
      }
    } else {
      acc[blog.user.name].blogCount += 1
    }

    return acc
  }, {})

  const usersArray = Object.entries(blogNumbers)

  if (usersArray?.length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <td>Users</td>
          <td>Blogs created</td>
        </tr>
      </thead>
      <tbody>
        {usersArray.map((user) => (
          <tr key={user[1].id}>
            <td>
              <Link to={`/users/${user[1].id}`} element={<SingleUser />}>
                {user[0]}
              </Link>
            </td>
            <td>{user[1].blogCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
