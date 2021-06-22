// import { Injectable, NestMiddleware } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';

export const expiredTokens = new Set();

export function CheckTokenIfAvailibleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req?.headers?.['authorization']?.split(' ')?.[1];
  const tokenExpired = expiredTokens.has(token);
  if (tokenExpired) throw new UnauthorizedException();

  next();
}
