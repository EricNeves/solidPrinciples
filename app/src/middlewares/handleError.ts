import { NextFunction, Request, Response } from "express";

export function handleError(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errorsMessage: { [key: string]: string } = {
    P2002: "Sorry, email already exists.",
    P2025: "Sorry, user not found.",
  };

  const errorMessage = errorsMessage[error.code] || error.message;

  return response.status(400).json({
    message: errorMessage,
  });
}
