import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeavesService {
    constructor(private prisma: PrismaService) {}

    async getAllLeaves() {
        const leaves = await this.prisma.leaveApplication.findMany({});
        return leaves;
      }

     async UpdateStatus(id,updatedStatus){
        id = parseInt(id);
        const updatedUser = await this.prisma.leaveApplication.update({
            where: { leave_application_id : id },
            data: {
              status: updatedStatus,
            },
          });
      }

}
