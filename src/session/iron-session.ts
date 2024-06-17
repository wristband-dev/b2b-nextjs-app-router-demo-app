import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import * as http from 'http';

import { SESSION_COOKIE_NAME, SESSION_COOKIE_SECRET } from '@/utils/constants';
import { User } from '@/types';
import { cookies } from 'next/headers';

export type SessionData = {
  accessToken: string;
  expiresAt: number;
  isAuthenticated: boolean;
  refreshToken?: string;
  tenantDomainName: string;
  user: User;
};

export const sessionOptions: SessionOptions = {
  cookieName: SESSION_COOKIE_NAME,
  password: SESSION_COOKIE_SECRET,
  cookieOptions: {
    httpOnly: true,
    maxAge: 1800,
    path: '/',
    sameSite: 'lax',
    // NOTE: If deploying your own app to production, do not disable secure cookies.
    secure: false,
  },
};

export function legacyGetSession(
  req: http.IncomingMessage | Request,
  res: http.ServerResponse | Response
): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(req, res, sessionOptions);
}


export function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}
