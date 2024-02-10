/*
  Warnings:

  - The `droppedAttributesCount` column on the `Trace` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `droppedEventsCount` column on the `Trace` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `droppedLinksCount` column on the `Trace` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `kind` on the `Trace` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trace" DROP COLUMN "kind",
ADD COLUMN     "kind" INTEGER NOT NULL,
ALTER COLUMN "startTimeUnixNano" DROP NOT NULL,
ALTER COLUMN "endTimeUnixNano" DROP NOT NULL,
DROP COLUMN "droppedAttributesCount",
ADD COLUMN     "droppedAttributesCount" INTEGER,
DROP COLUMN "droppedEventsCount",
ADD COLUMN     "droppedEventsCount" INTEGER,
DROP COLUMN "droppedLinksCount",
ADD COLUMN     "droppedLinksCount" INTEGER,
ALTER COLUMN "parentSpanId" DROP NOT NULL,
ALTER COLUMN "spanId" DROP NOT NULL;
