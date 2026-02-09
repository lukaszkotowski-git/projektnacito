import { render, screen } from '@testing-library/react'
import { ConsultConfigurator } from '../ConsultConfigurator'

describe('ConsultConfigurator layout', () => {
  it('renders date and time inputs and layout classes', () => {
    render(<ConsultConfigurator />)

    const dateInput = screen.getByLabelText(/data/i) || screen.getByLabelText(/date/i)
    const timeInput = screen.getByLabelText(/godzina|time/i)

    expect(dateInput).toBeInTheDocument()
    expect(timeInput).toBeInTheDocument()

    // container should have responsive layout classes present in markup
    const container = dateInput.closest('div')?.parentElement
    expect(container).toBeTruthy()
    if (container) {
      const classList = container.className
      expect(classList.includes('flex') || classList.includes('sm:flex-row')).toBe(true)
    }
  })
})
