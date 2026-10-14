---
applyTo: "**/*.test.ts,**/*.test.tsx,src/setupTests.ts,src/**/__mocks__/**"
---

# Unit test conventions

- Vitest (globals enabled, `forks` pool) + React Testing Library; environment is jsdom.
- Tests sit in a `__tests__` folder next to the code under test, named `<Subject>.test.ts(x)`.
- `src/setupTests.ts` loads jest-dom, initializes i18n with the Italian locale, and runs `cleanup()` and `vi.clearAllMocks()` after each test. Assert on visible Italian text or roles/labels; prefer `getByRole`/`getByLabelText` over test ids.
- The auth API client is mocked via `src/api/__mocks__`; extend it instead of re-mocking.
- `mockReset`, `restoreMocks` and `clearMocks` are enabled globally: re-declare mock implementations inside each test or `beforeEach`.
- Keep tests deterministic: no real timers/network, use `vi.useFakeTimers()` when needed. Never use real tokens or secrets in fixtures.
- Run a single file with `yarn vitest run <path>`.
