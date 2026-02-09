import { useState, useEffect, useRef, InputHTMLAttributes } from 'react'

interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string, isValid: boolean) => void
  label?: string
  errorMessage?: string
  className?: string
  required?: boolean
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export function EmailInput({
  value,
  onChange,
  label,
  errorMessage = 'Nieprawidłowy adres e-mail',
  className = '',
  required = false,
  ...props
}: EmailInputProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isTouched, setIsTouched] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim()
    if (!required && trimmed.length === 0) return true
    return EMAIL_REGEX.test(trimmed)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const valid = validateEmail(val)
    setDisplayValue(val)
    setIsValid(valid)
    onChange(val, valid)
  }

  const handleBlur = () => setIsTouched(true)

  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(value)
      setIsValid(validateEmail(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const showError = isTouched && displayValue.length > 0 && !isValid

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="email"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError}
          aria-describedby={showError ? 'email-error' : undefined}
          required={required}
          className={`w-full border rounded-2xl px-6 py-4 outline-none transition-colors ${
            showError
              ? 'border-red-500 focus:border-red-500 bg-red-50'
              : 'border-[#E5DED4] focus:border-[#8C7E6A] bg-white'
          } ${className}`}
          {...props}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {showError && (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </div>

      {showError && (
        <p id="email-error" className="text-xs text-red-500 ml-1 flex items-center gap-1" role="alert">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
