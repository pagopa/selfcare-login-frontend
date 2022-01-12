import * as env from 'env-var';
import { ROUTE_LOGOUT } from './constants';

export const PUBLIC_URL: string = env.get('PUBLIC_URL').default('').asString();

export const ENABLE_ASSISTANCE: boolean = env
  .get('REACT_APP_ENABLE_ASSISTANCE')
  .required()
  .asBool();

export const PAGOPA_HELP_EMAIL: string = env
  .get('REACT_APP_PAGOPA_HELP_EMAIL')
  .required()
  .asString();

export const URL_FE_LOGOUT: string = ROUTE_LOGOUT;

export const SPID_TEST_ENV_ENABLED: boolean = env
  .get('REACT_APP_SPID_TEST_ENV_ENABLED')
  .required()
  .asBool();

export const SPID_CIE_ENTITY_ID: string = env
  .get('REACT_APP_SPID_CIE_ENTITY_ID')
  .required()
  .asString();

export const URL_FE_ONBOARDING: string = env
  .get('REACT_APP_URL_FE_ONBOARDING')
  .required()
  .asString();

export const URL_FE_DASHBOARD: string = env.get('REACT_APP_URL_FE_DASHBOARD').required().asString();

export const URL_FE_LANDING: string = env.get('REACT_APP_URL_FE_LANDING').required().asString();

export const URL_API_LOGIN: string = env.get('REACT_APP_URL_API_LOGIN').required().asString();

export const URL_FILE_PRIVACY_DISCLAIMER: string = env
  .get('REACT_APP_URL_FILE_PRIVACY_DISCLAIMER')
  .required()
  .asString();

export const URL_FILE_TERMS_AND_CONDITIONS: string = env
  .get('REACT_APP_URL_FILE_TERMS_AND_CONDITIONS')
  .required()
  .asString();
