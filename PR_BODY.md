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

## Detailed files touched

- react-app/src/components/ui/EmailInput.tsx — new EmailInput component with real-time validation and aria attributes
- react-app/src/components/ui/PhoneInput.tsx — phone formatting/validation; removed positive success highlight
- react-app/src/components/FinalStep.tsx — replaced raw email input with EmailInput; wired validation into submit flow
- react-app/src/components/ConsultConfigurator.tsx — replaced raw email input, adjusted date/time layout to share available width
- react-app/src/components/ui/index.ts — exported EmailInput
- react-app/src/components/Navigation.tsx — removed ThemeToggle and dark: classes
- react-app/src/context/ThemeContext.tsx — removed (dark mode)
- react-app/src/components/ui/OrderSummaryModal.tsx — minor styling adjustments
- react-app/src/components/ui/ProgressBar.tsx — ensured animations remain without dark styles
- react-app/src/components/ui/Tooltip.tsx — ensured ARIA attributes and styles
- react-app/src/components/ui/Skeleton.tsx — removed dark styles

## Verification steps (manual)

1. Start dev server: cd react-app && npm install && npm run dev
2. Open app in desktop browser and navigate to the form with PhoneInput and EmailInput
   - Type an invalid Polish phone (e.g. "123") → blur → expect red error message and aria-invalid
   - Type a valid Polish phone (9 digits or with +48) → no green highlight; input uses default styles and onChange emits digits-only value
   - Type an invalid email (e.g. "a@b") → blur → expect red error message and aria-invalid
   - Type a valid email → no success message; input uses default styles
3. Open ConsultConfigurator on large viewport → date and time inputs appear on the same row and each use full available width
4. Open on mobile viewport → date and time stack vertically
5. Open navigation on mobile → ensure mobile menu works and no theme toggle present
6. Run npm run lint and npm run build in react-app — both should pass

## Constraints

- No type suppression (as any, @ts-ignore) allowed
- Do not reintroduce dark: Tailwind classes
- Run lint before pushing any follow-up commits
