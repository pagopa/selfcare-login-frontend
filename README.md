# selfcare-login-frontend

## Development

Use Node 24.13.0 (see [.node-version](.node-version) and [.nvmrc](.nvmrc)) and Yarn 1.22.

```sh
yarn install --frozen-lockfile
yarn start
```

The Vite development server serves the login application at `http://localhost:3000/auth/`.
With `VITE_ENV=LOCAL_DEV`, the development server keeps `/auth`, `/auth/` and
`/auth/login` on the login page even when a session token is stored, allowing manual
UI testing without an automatic dashboard redirect. The token is not deleted.
Logout and successful-login callbacks retain their normal behavior, including
navigation to the configured dashboard after authentication. This login preview
does not apply to builds or other environments.
The release branch's SPID/CIE flows, pathname-based routing, domain-specific legal paths,
redirects and session storage remain independent of main's authentication implementation.

## Environment and builds

Browser settings use `VITE_*` names. Development and test settings are provided by
[.env.development.local](.env.development.local) and [.env.test.local](.env.test.local).
Only public configuration belongs in `VITE_*` variables: they are embedded in the browser
bundle. Do not put secrets or real test credentials in them.

[readEnv](src/utils/readEnv.ts) retains required-value validation and boolean parsing.
Both development startup and builds fail explicitly for missing required configuration,
including the HTML CDN/OneTrust settings.

To build locally using development settings, then preview the optimized output:

```sh
yarn build --mode development
yarn preview
```

Deployment runs `yarn build` with its environment supplied by the reusable workflow.
An unconfigured `yarn build` does not fall back to development endpoints. Preview serves
an existing build without requiring those build-time variables again.

Output goes to `dist`, with source maps. Assets use the `/auth/` base; the route prefix
is normalized to `/auth` so concatenated routes never acquire a duplicate slash.
Vite's JavaScript targets are derived from the existing production browserslist. The
removed common-library IE11 polyfill entry point is not replaced with an IE11 support claim.

The [CDN workflow](.github/workflows/deploy_cdn.yml) and
[PNPG workflow](.github/workflows/deploy_cdn_pnpg.yml) use the corresponding Vite CDN
and Front Door reusable workflows in `pagopa/selfcare-commons`. Their environment-file
selection, Azure targets, `auth` destination and release promotion are unchanged.

There is one build-only compatibility alias:
[htmlEnv](config/htmlEnv.ts) prefers `REACT_APP_ONE_TRUST_BASE_URL` when the shared
CI environment supplies it. The shared PNPG DEV file currently has different CRA and
Vite consent-script paths; this preserves the release's existing endpoint. Local
development uses `VITE_ONE_TRUST_BASE_URL`. No legacy app environment or browser
`process.env` shim is exposed.

[Layout](src/components/Layout.tsx) uses the shared footer directly. Common-frontend
2.5.3 handles Imprese privacy navigation and legal URLs without a local wrapper or
footer configuration overrides. Shared configuration is applied before consent
initialization, including startup with an existing consent cookie.
The router provider supplies the context required by the upgraded shared header;
[App](src/App.tsx) still selects pages using the existing pathname comparisons.

## Validation

```sh
yarn typecheck
yarn typecheck:test
yarn lint
yarn test
yarn test:coverage
```

Tests use Vitest and jsdom, retain the release-specific login tests, and mock remote
product/banner fetches. Use paths for focused runs, for example:

```sh
yarn test src/pages/login/__tests__/Login.test.tsx src/pages/login/__tests__/SpidModal.test.tsx
```

React, i18next, Emotion and MUI must share runtime instances with common-frontend.
The Yarn resolutions prevent separate MUI/Emotion contexts from breaking the shared theme.

## VS Code

Select **TypeScript: Select TypeScript Version > Use Workspace Version** after installing
dependencies. [Workspace settings](.vscode/settings.json) point to the installed SDK.
[Root TypeScript configuration](tsconfig.json) links the application, test and tooling
projects so VS Code discovers the Vitest globals in [test configuration](tsconfig.test.json).
[Application configuration](tsconfig.app.json) uses bundler resolution, and
[Vite client declarations](src/vite-env.d.ts) type the CSS imports and browser assets.
Use the workspace SDK rather than suppressing deprecations or adding wildcard module
declarations to conceal missing imports.
If test globals still show errors after configuration changes, run
**TypeScript: Restart TS Server** from the Command Palette.
