import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o JWT do cabeçalho Authorization
      secretOrKey: "3dd53afbe800ffcf016df7a3d1201eabb84d62d8fab22900324a56101a3603a5" // Mesma chave usada no JwtModule
    })
  }

  async validate(payload: any) {
    return { accessToken: payload.accessToken, refreshToken: payload.refreshToken };
  }
}