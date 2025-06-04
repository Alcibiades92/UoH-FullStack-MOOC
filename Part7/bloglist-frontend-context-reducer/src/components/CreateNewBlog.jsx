import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

function CreateNewBlog({ addBlog }) {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    addBlog({ author, title, url })
  }
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
            data-testid="title"
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
            data-testid="author"
          />
        </div>
        <div>
          <label>Url</label>
          <input
            type="url"
            name="Url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
            data-testid="url"
          />
        </div>
        <button type="submit">Create new Blog</button>
      </form>
    </div>
  )
}

export default CreateNewBlog
