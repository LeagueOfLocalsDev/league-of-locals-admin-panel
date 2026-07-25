import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE || 'https://api.leagueoflocals.run',
    scope: 'openid profile email',
  },
});

export const getServerAccessToken = async () => {
  const accessToken = await auth0.getAccessToken();
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
};
