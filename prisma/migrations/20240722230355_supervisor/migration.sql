-- CreateTable
CREATE TABLE "CourseSupervisor" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CourseSupervisor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSupervisor_courseId_userId_key" ON "CourseSupervisor"("courseId", "userId");

-- AddForeignKey
ALTER TABLE "CourseSupervisor" ADD CONSTRAINT "CourseSupervisor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSupervisor" ADD CONSTRAINT "CourseSupervisor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
