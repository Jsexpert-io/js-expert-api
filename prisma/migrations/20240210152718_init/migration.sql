/*
  Warnings:

  - A unique constraint covering the columns `[spanId]` on the table `TraceSpan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spanId` to the `TraceSpan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TraceSpan" DROP CONSTRAINT "TraceSpan_parentSpanId_fkey";

-- AlterTable
ALTER TABLE "TraceSpan" ADD COLUMN     "spanId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TraceSpan_spanId_key" ON "TraceSpan"("spanId");

-- AddForeignKey
ALTER TABLE "TraceSpan" ADD CONSTRAINT "TraceSpan_parentSpanId_fkey" FOREIGN KEY ("parentSpanId") REFERENCES "TraceSpan"("spanId") ON DELETE SET NULL ON UPDATE CASCADE;
