import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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
})
