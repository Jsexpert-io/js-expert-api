-- AlterTable
ALTER TABLE "Developer" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "isEmailVerified" SET DEFAULT false;
