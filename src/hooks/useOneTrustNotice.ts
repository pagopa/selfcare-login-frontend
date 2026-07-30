/* eslint-disable functional/immutable-data */
import { RefObject, useEffect } from 'react';
import { isBackstageOrigin } from '../utils/backstage';

export type OneTrustNoticeConfig = {
  /** OneTrust notice UUID, used both for the `otnotice-{id}` container and the notices JSON url */
  noticeId: string;
  /** base64-encoded settings blob for the OneTrust script tag */
  settings: string;
  /** url of the published notice JSON to load via OneTrust.NoticeApi.LoadNotices */
  jsonUrl: string;
};

const SCRIPT_ID = 'otprivacy-notice-script';
const SCRIPT_SRC = process.env.VITE_OT_SRC ?? '';

/** Injects the OneTrust script for the given notice config, selecting the `backstageConfig`
 * over `normalConfig` when the page has been reached with `origin=backstage` and a
 * backstage config (with a non-empty noticeId) has actually been provided. Falls back to
 * `normalConfig` otherwise, keeping default behavior unchanged. */
export const useOneTrustNotice = (
  containerRef: RefObject<HTMLDivElement>,
  normalConfig: OneTrustNoticeConfig,
  backstageConfig?: OneTrustNoticeConfig
) => {
  const isBackstage = isBackstageOrigin() && !!backstageConfig?.noticeId;
  const activeConfig = isBackstage && backstageConfig ? backstageConfig : normalConfig;

  useEffect(() => {
    const script = document.createElement('script');

    script.src = SCRIPT_SRC;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.id = SCRIPT_ID;

    script.setAttribute('settings', activeConfig.settings);

    document.body.appendChild(script);

    script.onload = () => {
      (window as any).OneTrust?.NoticeApi?.Initialized.then(() => {
        (window as any).OneTrust.NoticeApi.LoadNotices([activeConfig.jsonUrl]);
      });
    };

    return () => {
      document.body.removeChild(script);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConfig.noticeId]);

  return {
    noticeId: activeConfig.noticeId,
    isBackstage,
  };
};
