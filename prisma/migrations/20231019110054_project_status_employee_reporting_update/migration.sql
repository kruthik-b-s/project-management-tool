/*
  Warnings:

  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "reporting_to_employee_id" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" TEXT NOT NULL;
