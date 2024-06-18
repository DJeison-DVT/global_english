/*
  Warnings:

  - You are about to drop the column `endingHour` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `startingHour` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Student` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "endingHour",
DROP COLUMN "startingHour",
ALTER COLUMN "level" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "fullname" TEXT NOT NULL;
