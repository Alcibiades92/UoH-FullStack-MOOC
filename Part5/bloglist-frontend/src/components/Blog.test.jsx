import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title of the blog only', () => {
  const blog = {
    title: 'The man on the silver mountain',
    author: 'Rainbow',
    url: 'http://no_url',
    likes: 155,
  }

  render(<Blog blog={blog} />)
  const element = screen.getByTestId('note')
  screen.debug()
  expect(element).toHaveTextContent('The man on the silver mountain')
  expect(element).toHaveTextContent('Rainbow')

  expect(element).not.toHaveTextContent('http://no_url')
  expect(element).not.toHaveTextContent(155)
  //   expect(element).not.toHaveTextContent('Rainbow')
})
