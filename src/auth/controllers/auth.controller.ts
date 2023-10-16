import {
  Body,
  Controller,
  Get,
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

@Controller('auth')
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

    // const token = await this.service.generateToken({
    //   sub: user.employee_id,
    //   email: user.email,
    // });

    // res.cookie('accessToken', token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 600000,
    // });

    if (user.Role.role_name === 'superadmin') {
      res.redirect('/client/pages/home-sa.html');
    } else if (user.Role.role_name === 'admin') {
      res.redirect('/client/pages/home-admin.html');
    } else {
      res.redirect('/client/pages/home-user.html');
    }

    // For serving files to front-end that is de-coupled
    // res.redirect('http://localhost:5500/client/pages/home-sa.html');
  }

  @Post('create')
  @Redirect('/client/pages/home-sa.html')
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
}
