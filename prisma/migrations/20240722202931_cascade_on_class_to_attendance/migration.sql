-- DropForeignKey
ALTER TABLE "Attended" DROP CONSTRAINT "Attended_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Attended" ADD CONSTRAINT "Attended_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
