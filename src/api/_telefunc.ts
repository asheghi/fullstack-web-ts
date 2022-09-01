import { provideTelefuncContext, telefunc, telefuncConfig } from "telefunc";
import express, { Request, Response } from "express";
import { Session } from "next-auth";
// todo move this back to /api directory when changing url was possible
const app = express.Router();

// back-end
telefuncConfig.telefuncUrl = "/api/_telefunc";

app.use(express.text());
const middleWare: any = async (
  req: Request & { session: Session },
  res: Response
) => {
  const { session } = req;

  provideTelefuncContext({ session });

  const httpResponse = await telefunc({
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });
  const { body, statusCode, contentType } = httpResponse;

  res.status(statusCode).type(contentType).send(body);
};

app.use(middleWare);
const telefuncMiddleware = app;

export default telefuncMiddleware;
