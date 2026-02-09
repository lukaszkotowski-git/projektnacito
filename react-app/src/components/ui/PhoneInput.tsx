import { useState, useEffect, useRef, InputHTMLAttributes } from 'react'

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string, isValid: boolean) => void
  label?: string
  errorMessage?: string
  successMessage?: string
}

const POLISH_PHONE_LENGTH = 9
const DIGITS_ONLY_REGEX = /^\d+$/

export function PhoneInput({
  value,
  onChange,
  label,
  errorMessage = 'Nieprawidłowy numer telefonu',
  successMessage = 'Numer telefonu poprawny',
  className = '',
  ...props
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isTouched, setIsTouched] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatPolishPhoneNumber = (input: string): string => {
    let cleaned = input.replace(/[^\d+]/g, '')
    
    if (cleaned.startsWith('+48')) {
      cleaned = cleaned.slice(3)
    } else if (cleaned.startsWith('48') && cleaned.length > POLISH_PHONE_LENGTH) {
      cleaned = cleaned.slice(2)
    }
    
    cleaned = cleaned.slice(0, POLISH_PHONE_LENGTH)
    
    if (cleaned.length > 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
    } else if (cleaned.length > 3) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
    }
    return cleaned
  }

  const validatePolishPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\s/g, '')
    return DIGITS_ONLY_REGEX.test(cleaned) && cleaned.length === POLISH_PHONE_LENGTH
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formatted = formatPolishPhoneNumber(rawValue)
    const valid = validatePolishPhone(formatted)
    
    setDisplayValue(formatted)
    setIsValid(valid)
    onChange(formatted.replace(/\s/g, ''), valid)
  }

  const handleBlur = () => {
    setIsTouched(true)
  }

  useEffect(() => {
    if (value && !displayValue) {
      const formatted = formatPolishPhoneNumber(value)
      setDisplayValue(formatted)
      setIsValid(validatePolishPhone(formatted))
    }
  }, [value, displayValue])

  const showError = isTouched && displayValue.length > 0 && !isValid
  const showSuccess = isTouched && isValid

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium">
          +48
        </div>
        <input
          ref={inputRef}
          type="tel"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError}
          aria-describedby={showError ? 'phone-error' : showSuccess ? 'phone-success' : undefined}
          className={`w-full border rounded-2xl pl-14 pr-12 py-4 outline-none transition-colors ${
            showError
              ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10'
              : showSuccess
              ? 'border-green-500 focus:border-green-500 bg-green-50 dark:bg-green-900/10'
              : 'border-[#E5DED4] dark:border-gray-700 focus:border-[#8C7E6A] bg-white dark:bg-gray-800'
          } dark:text-white ${className}`}
          {...props}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {showError && (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {showSuccess && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </div>
      {showError && (
        <p id="phone-error" className="text-xs text-red-500 ml-1 flex items-center gap-1" role="alert">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
      {showSuccess && (
        <p id="phone-success" className="text-xs text-green-600 dark:text-green-400 ml-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </p>
      )}
    </div>
  )
}
