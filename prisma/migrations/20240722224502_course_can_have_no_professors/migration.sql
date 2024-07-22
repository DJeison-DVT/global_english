-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_professorId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "professorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
