function decodeUTF8(binary: string) {
  const bytes = new Uint8Array(binary.length);
  // eslint-disable-next-line functional/no-let
  for (let b = 0; b < bytes.length; ++b) {
    // eslint-disable-next-line functional/immutable-data
    bytes[b] = binary.charCodeAt(b);
  }
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(decodeUTF8(atob(token.split('.')[1])));
  } catch (e) {
    return null;
  }
};
