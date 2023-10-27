import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeavesService {
    constructor(private prisma: PrismaService) {}

    async getAllLeaves() {
        const leaves = await this.prisma.leaveApplication.findMany({});
        return leaves;
      }
}
