# Copilot instructions

SelfCare login (PagoPA): React 18 + TypeScript SPA built with Vite, MUI v5 and `@pagopa/mui-italia`. Handles login, OTP, session validation, logout and OneIdentity callback. Node >= 24 (see `.node-version`), yarn 1 (classic).

## Commands

- `yarn start` – dev server
- `yarn build` – runs `generate`, then `tsc` and `vite build`
- `yarn generate` – regenerates the auth API client into `src/api/generated/selfcare-auth` from `openApi/openapi.json` (do not edit generated files)
- `yarn test` – Vitest (jsdom, forks pool); single file: `yarn vitest run src/path/to/file.test.tsx`
- `yarn test:coverage`, `yarn test:perf` (verbose)
- `yarn lint` / `yarn lint-autofix`, `yarn prettify`

## Architecture

- `src/pages` – one folder per flow: `loginError`, `loginSuccess`, `logout`, `logoutGoogle`, `oneIdentityAuthCallback`, `otp`, `ValidateSession`, plus privacy/terms pages; `src/components` – `Layout`, `LoginHeader`.
- `src/api` – `SelfcareAuthApiClient` wrapping the generated io-ts client (mocks in `src/api/__mocks__`); `src/services/selfcareAuth.ts` – service layer.
- `src/lib/jwt-utils.ts`, `src/utils` (constants, `env.ts`, `storage.ts`), `src/models`, `src/redux` (Redux Toolkit store).
- `src/locale` – i18next translations (`it`, `en`, `fr`, `de`, `sl`); every user-facing string must go through `t()` and be added to all locales.
- Shared auth/session/error handling comes from `@pagopa/selfcare-common-frontend`.

## Security notes

- Handle tokens, OTP and session data only via `src/utils/storage.ts` and `src/lib/jwt-utils.ts`; never log them or put them in URLs unless the flow already requires it.
- Validate redirect targets and callback parameters before using them.

## Environment and mocks

- Config comes from `.env`, `.env.development.local` and `.env.test`, read via `import.meta.env` (typed in `src/vite-env.d.ts`) and exposed through `ENV` in `src/utils/env.ts`. Add new `VITE_*` variables to `vite-env.d.ts` and `.env`.
- `VITE_API_MOCK` enables mock behavior.
- `yarn generate` must be run before type-check/tests; generated clients are gitignored.

## Conventions

- Prettier: 100 cols, semicolons, single quotes, trailing commas `es5`.
- ESLint (`.eslintrc.js`) includes sonarjs, functional and react-hooks rules; keep lint clean.
- Functional components with hooks; fp-ts/io-ts for decoding API responses.
- Tests live in `__tests__` folders next to the code, using Vitest + React Testing Library; globals are enabled and setup is in `src/setupTests.ts`.
- Never commit secrets.
