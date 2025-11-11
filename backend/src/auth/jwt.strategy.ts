import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.OIDC_AUDIENCE,
      issuer: process.env.OIDC_ISSUER,
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${process.env.OIDC_ISSUER}/.well-known/jwks.json`,
      }),
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: payload.roles || payload.role,
    };
  }
}
