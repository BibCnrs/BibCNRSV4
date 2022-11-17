// This guard is not currently used because we do not have login feature on frontend and we create new ebsco session on each request
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from 'express';
import { EbscoService } from './ebsco.service';

const COOKIE_NAME = 'bib-token';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(EbscoService) private readonly ebscoService: EbscoService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<Request & { user?: Record<string, unknown> }>(context);
    const response = this.getResponse<Response>(context);
    try {
      const token = this.getToken(request);
      this.setToken(response, token);
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      // return false or throw a specific error if desired
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getResponse<T>(context: ExecutionContext): T {
    return context.switchToHttp().getResponse();
  }

  protected getToken(request: Request): string {
    let token = request.signedCookies[COOKIE_NAME];
    if (!token) {
      token = this.ebscoService.createEbscoSession();
    }
    return token;
  }

  protected setToken(response: Response, token: string): void {
    const cookieOptions = {
      httpOnly: true,
      overwrite: true,
      secure: process.env.ENV === 'production',
      signed: true,
    };
    response.cookie(COOKIE_NAME, token, cookieOptions);
  }
}
