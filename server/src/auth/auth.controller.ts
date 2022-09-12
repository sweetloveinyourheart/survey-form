import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    const user: User = req.user
    return this.authService.login(user, res);
  }

  @Get('/refreshToken')
  async refreshToken(@Req() req: Request) {
    const token = req.cookies['refreshToken']
    return this.authService.refreshToken(token)
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res)
  }

}
