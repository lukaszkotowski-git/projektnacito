import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PhoneInput } from '../PhoneInput'

describe('PhoneInput', () => {
  it('formats polish number and calls onChange with digits only', () => {
    const handleChange = jest.fn()
    render(<PhoneInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '123456789' } })

    expect(handleChange).toHaveBeenCalled()
    // last call passes digits-only value
    expect(handleChange.mock.calls[handleChange.mock.calls.length - 1][0]).toBe('123456789')
  })

  it('shows error when invalid after blur', () => {
    const handleChange = jest.fn()
    render(<PhoneInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })
})
