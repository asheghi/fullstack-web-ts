/* eslint-disable @typescript-eslint/ban-ts-comment */
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import fetch, { Headers, Request, Response } from "node-fetch";
import dotenv from "dotenv";
import { join } from "path";
// @ts-ignore
import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient();

const providers = [
  GithubProvider({
    clientId: githubId,
    clientSecret: githubSecret,
  }),
];

if (process.env.EMAIL_SERVER_HOST) {
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  });
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session && session.user && user) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        session.user.role = user.role; // Add role value to user object so it is passed along with session
      }

      return session;
    },
  },
});
