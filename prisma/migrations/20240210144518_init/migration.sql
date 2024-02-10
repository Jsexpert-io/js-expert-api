/*
  Warnings:

  - You are about to drop the column `attributes` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `droppedAttributesCount` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `droppedEventsCount` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `droppedLinksCount` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `endTimeUnixNano` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `events` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `links` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `parentSpanId` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `spanId` on the `Trace` table. All the data in the column will be lost.
  - You are about to drop the column `startTimeUnixNano` on the `Trace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trace" DROP COLUMN "attributes",
DROP COLUMN "droppedAttributesCount",
DROP COLUMN "droppedEventsCount",
DROP COLUMN "droppedLinksCount",
DROP COLUMN "endTimeUnixNano",
DROP COLUMN "events",
DROP COLUMN "kind",
DROP COLUMN "links",
DROP COLUMN "parentSpanId",
DROP COLUMN "spanId",
DROP COLUMN "startTimeUnixNano";

-- CreateTable
CREATE TABLE "TraceSpan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "traceId" TEXT NOT NULL,
    "spanId" TEXT,
    "kind" INTEGER NOT NULL,
    "parentSpanId" TEXT,
    "startTimeUnixNano" TEXT,
    "endTimeUnixNano" TEXT,
    "attributes" JSONB,
    "droppedAttributesCount" INTEGER,
    "events" JSONB,
    "droppedEventsCount" INTEGER,
    "links" JSONB,
    "droppedLinksCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TraceSpan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TraceSpan_spanId_key" ON "TraceSpan"("spanId");

-- AddForeignKey
ALTER TABLE "TraceSpan" ADD CONSTRAINT "TraceSpan_traceId_fkey" FOREIGN KEY ("traceId") REFERENCES "Trace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
