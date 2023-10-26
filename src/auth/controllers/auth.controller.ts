import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google.guard';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { LoginDto } from "../dto's/auth.dto";

@Controller('api/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('verify/:token')
  async authenticate(@Param('token') token: string) {
    const payload = await this.service.verifyToken(token);
    return payload;
  }

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
      // httpOnly: true, // cannot be accessed by scripts if set to true
      secure: true,
      maxAge: 600000,
    });

    if (user.Role.role_name === 'superadmin') {
      res.redirect('/pages/home-sa.html');
    } else if (user.Role.role_name === 'admin') {
      res.redirect('/pages/home-admin.html');
    } else {
      res.redirect('/pages/home-user.html');
    }
  }

  @Post('create')
  @Redirect('/pages/home-sa.html')
  createUserController(@Body() userDetails: LoginDto) {
    try {
      this.service.createUser(userDetails);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('getAllEmployees')
  viewAllEmployeesController() {
    try {
      return this.service.getAllEmployees();
    } catch (error) {
      return {
        employee_id: null,
        employee_name: null,
        department: null,
        performance: null,
      };
    }
  }

  @Get('/find/:email')
  findByEmail(@Param('email') email: string) {
    return this.service.findUserByEmail(email);
  }
}
