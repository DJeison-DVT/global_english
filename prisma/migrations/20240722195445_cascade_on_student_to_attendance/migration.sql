-- DropForeignKey
ALTER TABLE "Attended" DROP CONSTRAINT "Attended_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Attended" ADD CONSTRAINT "Attended_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
