import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser(userDetails) {
    try {
      let user = await this.prisma.employee.findUnique({
        where: {
          email: userDetails.email,
        },
      });

      let userRole = await this.prisma.role.findUnique({
        where: {
          role_name: 'user',
        },
      });

      if (!userRole) {
        userRole = await this.prisma.role.create({
          data: {
            role_name: 'user',
            permissions: ['view'],
          },
        });
      }

      if (!user) {
        user = await this.prisma.employee.create({
          data: {
            employee_name: userDetails.name,
            email: userDetails.email,
            employee_role_id: userRole.role_id,
          },
        });
      }

      return { message: 'Signed in sucessfully', user_details: userDetails };
    } catch (error) {
      return { message: 'Failed to sign in user', error: error.message };
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.prisma.employee.findUnique({
        where: {
          email: email,
        },
        include: {
          Role: {
            select: {
              role_name: true,
              permissions: true,
            },
          },
        },
      });
    } catch (error) {
      // return {
      //   message: 'User not found with the given email',
      //   Role: { role_name: null },
      //   error: error.message,
      // };
      throw new Error(error.message);
    }
  }

  async getAllEmployees() {
    try {
      const users = await this.prisma.employee.findMany();

      return users;
    } catch (error) {
      return { message: 'Failed to fetch users', error: error.message };
    }
  }

  async generateToken(payload: {
    sub: number;
    email: string;
    role: string;
    permissions: string[];
  }) {
    try {
      return await this.jwt.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1h',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyToken(token: string) {
    try {
      return await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
