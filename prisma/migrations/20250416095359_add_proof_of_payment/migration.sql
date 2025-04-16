-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "proofOfPayment" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
