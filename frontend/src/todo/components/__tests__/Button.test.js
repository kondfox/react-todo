import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
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
    render(<Button title={title} />)
    expect(screen.getByText('title')).toBeDefined()
  })

  it('calls the given event on click', () => {
    const title = 'title'
    const clickEvent = jest.fn()
    render(<Button title={title} click={clickEvent}></Button>)

    fireEvent.click(screen.getByText(title))
    expect(clickEvent).toBeCalled()
  })
})
