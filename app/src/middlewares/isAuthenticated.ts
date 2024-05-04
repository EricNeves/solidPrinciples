import { Request, Response, NextFunction } from "express";
import { Jwt } from '../utils/jwt/features/Jwt'
import { JwtHelper } from "../utils/jwt/features";

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationHeader = request.headers["authorization"];

  if (!authorizationHeader) {
    return response.status(401).json({
      message: "Please include your bearer token in the authorization header.",
    });
  }

  const [prefix, token] = authorizationHeader.split(' ')

  if (prefix !== 'Bearer') {
    return response.status(401).json({
      message: "Please include your bearer token in the authorization header.",
    });
  }

  const jwt = new Jwt(new JwtHelper())

  const user = jwt.verify(token)

  if (!user) {
    return response.status(401).json({
      message: 'Sorry, the bearer token you provided is invalid.'
    })
  }
  
  request.customer = user

  next();
}
