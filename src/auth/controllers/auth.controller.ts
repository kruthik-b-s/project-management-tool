import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google.guard';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {}

  @Get('google/signin')
  @UseGuards(GoogleAuthGuard)
  async loginUser(@Req() req: Request, @Res() res: Response) {
    const authUser = await this.service.validateUser(req.user);
    const user = await this.service.findUserByEmail(
      authUser.user_details.email,
    );

    const token = await this.service.generateToken({
      sub: user.employee_id,
      email: user.email,
      role: user.Role.role_name,
      permissions: user.Role.permissions,
    });

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 600000,
    });

    if (user.Role.role_name === 'superadmin') {
      res.render('homeSuperAdmin');
    } else if (user.Role.role_name === 'admin') {
      res.render('homeAdmin');
    } else {
      res.render('homeUser');
    }
  }
}
