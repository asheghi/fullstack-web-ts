/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";

const apiDir = join(__dirname, "../api");
const app = express.Router();

function mountApis(baseDir: string, prefix = "") {
  const mainDir = readdirSync(baseDir);

  mainDir.map((fileName) => {
    const path = join(baseDir, fileName);

    if (statSync(path).isDirectory()) {
      mountApis(path, `${prefix}/${fileName}`);
    } else {
      const module = require(path);
      const baseName = parse(path).name;
      const mountPoint = `${prefix}/${baseName}`;

      app.use(mountPoint, module.default);
      // eslint-disable-next-line no-console
      console.log(`mounted api at '${mountPoint}'`);
    }

    return null;
  });
}

mountApis(apiDir);

app.get("/", (req, res) => {
  res.send("api base");
});

app.use("*", (req, res) => {
  res.status(404).send("api not found.");
});

const ApiHandler = app;

export { ApiHandler };
