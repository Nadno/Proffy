export const getTokenExpire = (token: string) => {
  if (!token) return 0;

  try {
    const [, payload] = token.split('.');
    const data = JSON.parse(atob(payload));
    const expires = data ? data.exp : 0;

    return expires;
  } catch (err) {
    return 0;
  };
};