import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
const { Button } = require('../Button')

afterEach(cleanup)

describe('Button component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button />, div)
  })

  it('shows the given title', () => {
    const title = 'title'
    const { getByText } = render(<Button title={title} />)
    getByText(title)
  })

  it('calls the given event on click', () => {
    const title = 'title'
    const clickEvent = jest.fn()
    const { getByText } = render(<Button title={title} click={clickEvent} />)

    fireEvent.click(getByText(title))

    expect(clickEvent).toBeCalled()
  })
})
