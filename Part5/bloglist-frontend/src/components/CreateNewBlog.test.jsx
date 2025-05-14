import { render, screen } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog'
import userEvent from '@testing-library/user-event'

test('<CreatNewBLog/>', async () => {
  const mockedHandler = vi.fn()
  const user = userEvent.setup()
  render(<CreateNewBlog addBlog={mockedHandler} />)
  const button = screen.getByText('Create new Blog')
  const inputUrl = screen.getByPlaceholderText('url')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputTitle = screen.getByPlaceholderText('title')
  await userEvent.type(inputUrl, 'https://fullstackopen.com/')
  await userEvent.type(inputAuthor, 'University of helsinki')
  await userEvent.type(inputTitle, 'Fullstack development')
  await userEvent.click(button)
  // console.log(mockedHandler.mock.calls[0][0])
  // console.log(mockedHandler.mock.calls[0][0].author)
  expect(mockedHandler.mock.calls).toHaveLength(1)
  expect(mockedHandler.mock.calls[0][0].author).toBe('University of helsinki')
  expect(mockedHandler.mock.calls[0][0].title).toBe('Fullstack development')
  expect(mockedHandler.mock.calls[0][0].url).toBe('https://fullstackopen.com/')
})
