import { TextDecoder } from 'util';

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(
          atob(token.split('.')[1])
            .split('')
            .map((x) => x.charCodeAt(0))
        )
      )
    );
  } catch (e) {
    return null;
  }
};
