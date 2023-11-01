import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { PathModule } from './path/path.module';
import { EmployeeModule } from './employee/employee.module';
import { AppController } from './app.controller';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { EmployeePerformanceModule } from './employee-performance/employee-performance.module';
import { JwtService } from '@nestjs/jwt';
import { JwtUtils } from './auth/utils/jwt.utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    PassportModule.register({ session: true }),
    PathModule,
    EmployeeModule,
    ProjectModule,
    EmployeePerformanceModule,
  ],
  controllers: [AppController, ProjectController],
  providers: [ProjectService, JwtService, JwtUtils],
})
export class AppModule {}
