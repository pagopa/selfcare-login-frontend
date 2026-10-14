import { readEnv } from './readEnv';

export const ENV = readEnv(import.meta.env, import.meta.env.BASE_URL);
