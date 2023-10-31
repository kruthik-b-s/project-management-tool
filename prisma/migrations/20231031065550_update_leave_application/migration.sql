-- AlterTable
ALTER TABLE "LeaveApplication" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "comments" DROP NOT NULL;
