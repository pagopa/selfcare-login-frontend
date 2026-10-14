---
applyTo: "src/components/**,src/pages/**"
---

# Components and pages

- Functional components with typed props (`type Props`), no `any`; one component per PascalCase file named like the component.
- Use MUI v5 and `@pagopa/mui-italia` components first; style with `sx`/MUI theme, not ad-hoc CSS.
- All user-facing text through `useTranslation()`'s `t()`; add keys to every locale (see locale instructions).
- API calls go through `src/services/*` (which use `src/api` clients), not directly in components.
- Handle loading, error and empty states using the common-frontend error handling.
- Routing is React Router v5 (`useHistory`, `useLocation`).
- Treat query parameters and redirect URLs as untrusted; never log tokens, OTP or session data.
- Keep state as close as possible to where it is used; avoid `useEffect` when a derived value or event handler suffices.
- Use semantic HTML and accessibility attributes; stable keys in lists.
- Don't add `useMemo`/`useCallback` without a concrete reason.
- If a component mixes unrelated responsibilities, propose splitting it.
- Add or update a test in the nearest `__tests__` folder for behavior changes.
