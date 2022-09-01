import { NextFunction, Request, Response } from "express";
import { Session } from "next-auth";

export const dashboardGuard = (
  req: Request & { session?: Session },
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.user)
    return res.redirect("/api/auth/signin");

  return next();
};
