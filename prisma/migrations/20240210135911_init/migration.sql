/*
  Warnings:

  - Added the required column `description` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Metric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
