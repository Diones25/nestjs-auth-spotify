import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
declare module 'express-session' {
  interface SessionData {
    accessToken: string;
    refreshToken: string;
  }
}

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async login() { }
  
  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async callback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      return res.redirect('/auth/spotify'); // Redireciona para iniciar o processo novamente
    }

    const { accessToken, refreshToken } = req.user as any;

    // Armazena os tokens na sessão
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    // Redireciona o usuário para outra rota
    res.redirect('/auth/profile');
  }

  @Get('profile')
  async profile(@Req() req: Request) {
    const accessToken = req.session.accessToken;
    const refreshToken = req.session.refreshToken;

    return { accessToken, refreshToken };
  }
}
