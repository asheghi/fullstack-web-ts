/* eslint-disable @typescript-eslint/ban-ts-comment */
import GithubProvider from "next-auth/providers/github";
import fetch, { Headers, Request, Response } from "node-fetch";
import dotenv from "dotenv";
import { join } from "path";
import NextAuth from "../lib/next-auth";

dotenv.config({ path: join(__dirname, "../../.env") });

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = fetch;
  // @ts-ignore
  globalThis.Headers = Headers;
  // @ts-ignore
  globalThis.Request = Request;
  // @ts-ignore
  globalThis.Response = Response;
}

const githubSecret = process.env.GITHUB_SECRET!;
const githubId = process.env.GITHUB_ID!;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
