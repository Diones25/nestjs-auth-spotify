import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLogin() { }
  
  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLoginCallback(@Req() req) {
    // Após a autenticação, o usuário é redirecionado para esta rota
    // O usuário autenticado é armazenado em req.user
    return req.user;
  }
}
