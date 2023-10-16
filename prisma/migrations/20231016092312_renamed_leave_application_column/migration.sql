/*
  Warnings:

  - You are about to drop the column `employeeEmployee_id` on the `LeaveApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_employeeEmployee_id_fkey";

-- AlterTable
ALTER TABLE "LeaveApplication" DROP COLUMN "employeeEmployee_id",
ADD COLUMN     "leave_application_employee_id" INTEGER;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_leave_application_employee_id_fkey" FOREIGN KEY ("leave_application_employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
