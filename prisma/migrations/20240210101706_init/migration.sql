/*
  Warnings:

  - A unique constraint covering the columns `[traceId]` on the table `Trace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spanId` to the `Trace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traceId` to the `Trace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trace" ADD COLUMN     "spanId" TEXT NOT NULL,
ADD COLUMN     "traceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trace_traceId_key" ON "Trace"("traceId");
