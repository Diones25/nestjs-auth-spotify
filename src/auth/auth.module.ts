import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SpotifyStrategy } from './strategies/spotify.strategy';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'spotify' }),
    JwtModule.register({
      secret: "3dd53afbe800ffcf016df7a3d1201eabb84d62d8fab22900324a56101a3603a5",
      signOptions: { expiresIn: '1h' }, // Tempo de vida do JWT (1 hora)
    })
  ],
  providers: [SpotifyStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
