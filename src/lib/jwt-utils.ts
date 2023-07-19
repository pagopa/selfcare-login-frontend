export const parseJwt = (token: string) => {
  try {
    return JSON.parse(unescape(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
