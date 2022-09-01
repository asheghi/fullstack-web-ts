/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr";
import { ApiHandler } from "./lib/api-handler.middleware";
import { exposeSession } from "./lib/session-utils";
import { dashboardGuard as authGuard } from "./lib/dashboard-gurad";

const isProduction = process.env.NODE_ENV === "production";

export const rootDir = `${__dirname}/..`;

async function startServer() {
  const app = express();

  // authenticate all requests
  app.use(exposeSession);

  app.use("/protected", authGuard);

  app.use("/api", ApiHandler);

  app.use(compression());

  if (isProduction) {
    const sirv = require("sirv");

    app.use(sirv(`${rootDir}/dist/client`));
  } else {
    const vite = require("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root: rootDir,
        server: { middlewareMode: "ssr" },
      })
    ).middlewares;

    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const { session, csrf, callbackUrl } = req as any;
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      session,
      csrf,
      callbackUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) return next();

    const { body, statusCode, contentType } = httpResponse;

    return res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;

  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
}

startServer();
