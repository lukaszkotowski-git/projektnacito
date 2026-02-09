## Summary

- Removed dark mode and ThemeContext
- Added EmailInput component with real-time validation
- Updated PhoneInput to only show errors (no success highlight)
- Adjusted ConsultConfigurator date/time inputs to use full available width on larger screens

## Verification

- Type-check: OK
- Vite build: OK

## Files changed
- react-app/src/components/ui/EmailInput.tsx (added)
- react-app/src/components/ui/PhoneInput.tsx (updated)
- react-app/src/context/ThemeContext.tsx (deleted)
- (and other UI/component updates)

## Checklist

- [ ] Run manual QA for phone/email inputs on mobile and desktop
- [ ] Add unit tests for PhoneInput and EmailInput

Please review the changes and suggest any improvements.
