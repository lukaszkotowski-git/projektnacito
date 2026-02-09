// React import not required in newer JSX runtimes; keep file strict for TS checks
import { render, screen, fireEvent } from '@testing-library/react'
import { EmailInput } from '../EmailInput'

describe('EmailInput', () => {
  it('validates email and calls onChange', () => {
    const handleChange = jest.fn()
    render(<EmailInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'bad-email' } })
    fireEvent.blur(input)

    expect(handleChange).toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })
})
