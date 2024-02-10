/*
  Warnings:

  - You are about to drop the column `spanId` on the `TraceSpan` table. All the data in the column will be lost.
  - You are about to drop the `Trace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trace" DROP CONSTRAINT "Trace_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TraceSpan" DROP CONSTRAINT "TraceSpan_traceId_fkey";

-- DropIndex
DROP INDEX "TraceSpan_spanId_key";

-- AlterTable
ALTER TABLE "TraceSpan" DROP COLUMN "spanId",
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "status" JSONB,
ALTER COLUMN "traceId" DROP NOT NULL,
ALTER COLUMN "kind" DROP NOT NULL;

-- DropTable
DROP TABLE "Trace";

-- AddForeignKey
ALTER TABLE "TraceSpan" ADD CONSTRAINT "TraceSpan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraceSpan" ADD CONSTRAINT "TraceSpan_parentSpanId_fkey" FOREIGN KEY ("parentSpanId") REFERENCES "TraceSpan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
