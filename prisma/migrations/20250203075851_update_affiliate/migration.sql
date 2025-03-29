/*
  Warnings:

  - A unique constraint covering the columns `[refferalCode]` on the table `Affiliate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[affiliateLink]` on the table `Affiliate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_refferalCode_key" ON "Affiliate"("refferalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_affiliateLink_key" ON "Affiliate"("affiliateLink");
