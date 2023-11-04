/*
  Warnings:

  - You are about to drop the column `project_details_id` on the `ProjectDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_details_project_id]` on the table `ProjectDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_details_project_id` to the `ProjectDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectDetail" DROP CONSTRAINT "ProjectDetail_project_details_id_fkey";

-- DropIndex
DROP INDEX "ProjectDetail_project_details_id_key";

-- AlterTable
ALTER TABLE "ProjectDetail" DROP COLUMN "project_details_id",
ADD COLUMN     "project_details_project_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_project_details_project_id_key" ON "ProjectDetail"("project_details_project_id");

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_project_details_project_id_fkey" FOREIGN KEY ("project_details_project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
