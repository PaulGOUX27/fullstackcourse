import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        author: 'pgoux',
        description: 'A very nice book',
        title: 'A nice book',
        likes: 324
    }

    const component = render(
        <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
        'A nice book pgoux'
    )
})

test('renders content after click on View button', () => {
    const blog = {
        author: 'pgoux',
        description: 'A very nice book',
        title: 'A nice book',
        likes: 324
    }

    const component = render(
        <Blog blog={blog}/>
    )

    let button = component.getByText('View')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'A nice bookHideA very nice bookLike 324Likepgoux'
    )
})

test('double fire like button', () => {
    const blog = {
        author: 'pgoux',
        description: 'A very nice book',
        title: 'A nice book',
        likes: 324
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler}/>
    )

    let button = component.getByText('View')
    fireEvent.click(button)

    button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
