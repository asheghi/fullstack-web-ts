import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import { Router } from "express";
import NextAuth, { NextAuthOptions } from "next-auth";

/**
 * Should match the following paths:
 * /api/auth/signin
 * /api/auth/signin/:provider
 * /api/auth/callback/:provider
 * /api/auth/signout
 * /api/auth/session
 * /api/auth/csrf
 * /api/auth/providers
 * /api/auth/_log
 *
 * See: https://next-auth.js.org/getting-started/rest-api
 */

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Request = Object;

/** Compatibility layer for `next-auth` for `express` apps.  */
export default function NextAuthMiddleware(options: NextAuthOptions) {
  return router
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(cookieParser())
    .all("*", (req: any, res: any, next) => {
      if (req.method !== "POST" && req.method !== "GET") {
        return next();
      }

      const query = req.path.split("/").slice(1);

      req.query.nextauth = query;

      return NextAuth(req, res, options);
    });
}
