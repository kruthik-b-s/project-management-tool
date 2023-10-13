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
            roleRole_id: userRole.role_id,
          },
        });
      }

      return { message: 'Signed in sucessfully', user_details: userDetails };
    } catch (error) {
      return { message: 'Failed to sign in user', error: error.message };
    }
  }

  async findUserByEmail(email: string) {
    return await this.prisma.employee.findUnique({
      where: {
        email: email,
      },
      include: {
        Role: {
          select: {
            role_name: true,
          },
        },
      },
    });
  }

  async generateToken(payload: { sub: number; email: string }) {
    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });
  }
}
