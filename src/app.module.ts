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
import { LeavesModule } from './leaves/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    PassportModule.register({ session: true }),
    PathModule,
    EmployeeModule,
    ProjectModule,
    LeavesModule,
  ],
  controllers: [AppController, ProjectController],
  providers: [ProjectService],
})
export class AppModule {}
