import express, { NextFunction, Request, Response } from "express";
import { Session } from "next-auth";
import setCookie from "set-cookie-parser";
import dotenv from "dotenv";
import { join } from "path";

import cookieParser from "cookie-parser";

const app = express.Router();
// todo load environment at app entrypoint
const path = join(__dirname, "../../.env");

dotenv.config({ path });
const uri = process.env.NEXTAUTH_URL;

if (!uri) {
  throw new Error("Please add your NEXTAUTH_URL to .env");
}

const useSecureCookie = (uri || "").startsWith("https://");
// const sessionCookie =  (useSecureCookie ? '__Secure-' : '') + 'next-auth.session-token'
const csrfCookie = `${useSecureCookie ? "__Host-" : ""}next-auth.csrf-token`;
const callbackCookie = `${
  useSecureCookie ? "__Secure-" : ""
}next-auth.callback-url`;

const exposeSessionHandler = async (
  req: Request & {
    session?: Session;
    csrfToken?: string;
    callbackUrl?: string;
  },
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl.startsWith("/api/auth")) return next();

  try {
    const options = req.headers.cookie
      ? { headers: { cookie: req.headers.cookie } }
      : {};

    const sessionRes: any = await fetch(`${uri}/api/auth/session`, options);
    const session: Session = await sessionRes.json();

    req.session = session;
    const cookies = sessionRes.headers.raw()["set-cookie"] || [];

    res.setHeader("Set-Cookie", cookies);
    const parsed: any = setCookie.parse(cookies, { map: true });
    const csrfToken: string =
      (parsed[csrfCookie] || {}).value || req.cookies[csrfCookie];

    // eslint-disable-next-line prefer-destructuring
    req.csrfToken = csrfToken.split("|")[0];
    const callbackUrl: string =
      (parsed[callbackCookie] || {}).value || req.cookies[callbackCookie];

    req.callbackUrl = callbackUrl;
  } catch (e) {
    console.error(e);
  }

  return next();
};

app.use(cookieParser());
app.use(exposeSessionHandler);

export const exposeSession = app;
