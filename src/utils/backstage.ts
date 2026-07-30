/** Detects whether the current page has been reached from a Backstage/PagoPA context,
 * signaled by the `origin=backstage` query param appended by
 * `@pagopa/selfcare-common-frontend`'s `appendBackstageParam` helper. */
export const isBackstageOrigin = (): boolean =>
  new URLSearchParams(window.location.search).get('origin') === 'backstage';
