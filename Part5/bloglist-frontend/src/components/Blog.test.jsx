import { render, screen } from '@testing-library/react'
import Blog, { Button } from './Blog'

import userEvent from '@testing-library/user-event'

import BlogService from '../services/blogs'

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'The man on the silver mountain',
      author: 'Rainbow',
      url: 'http://no_url',
      likes: 155,
    }
    render(<Blog blog={blog} />)
  })
  test('renders title of the blog only', () => {
    const element = screen.getByTestId('note')

    expect(element).toHaveTextContent('The man on the silver mountain')
    expect(element).toHaveTextContent('Rainbow')

    expect(element).not.toHaveTextContent('http://no_url')
    expect(element).not.toHaveTextContent(155)
    //   expect(element).not.toHaveTextContent('Rainbow')
  })

  test('clicking the button makes url and likes appear', async () => {
    const mockHandler = vi.fn()

    const element = screen.getByTestId('note')

    const user = userEvent.setup()
    const button = screen.queryByText('view')

    const element3 = screen.queryByText('👍')
    expect(element3).not.toBeInTheDocument()
    await user.click(button)
    const element2 = screen.getByText('👍')
    expect(element2).toBeDefined()

    expect(element).toHaveTextContent(155)
    expect(element).toHaveTextContent('http://no_url')
  })

  test('clicking the hide button after the view button hides the url', async () => {
    const mockHandler = vi.fn()
    const element = screen.getByTestId('note')
    const user = userEvent.setup()
    const button = screen.queryByText('view')

    expect(element).not.toHaveTextContent(155)
    expect(element).not.toHaveTextContent('http://no_url')
  })
})

test('clicking the like button twice the event handler is called twice', async () => {
  const blog = {
    title: 'The man on the silver mountain',
    author: 'Rainbow',
    url: 'http://no_url',
    likes: 155,
  }
  const mockHandler = vi.fn()
  render(<Button blog={{}} handleLike={mockHandler} />)
  const user = userEvent.setup()

  const likeButton = screen.getByText('👍')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
