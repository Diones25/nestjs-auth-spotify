import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async login() { }
  
  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async callback(@Req() req: Request, @Res() res: Response) {
    // Aqui você pode redirecionar o usuário ou retornar os tokens
    const { accessToken, refreshToken } = req.user as any;

    // Redireciona o usuário para outra rota após a autenticação
    res.redirect(`/auth/profile?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  @Get('profile')
  async profile(@Query('accessToken') accessToken: string, @Query('refreshToken') refreshToken: string) {
    return { accessToken, refreshToken };
  }
}
