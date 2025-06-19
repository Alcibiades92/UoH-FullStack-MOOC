import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { bool } from 'prop-types'
const SingleUser = () => {
  const id = useParams().id
  const userBlogs = useSelector((state) => state.blogs).filter((blog) => {
    return id === blog.user.id
  })

  if (!userBlogs) {
    return <p>1</p>
  }
  return (
    <ul>
      {userBlogs.map((blog) => {
        return <li key={blog.id}>{blog.title}</li>
      })}
    </ul>
  )
}

export default SingleUser
