-- CreateTable
CREATE TABLE "BuyTransaction" (
    "id" SERIAL NOT NULL,
    "buyer" TEXT NOT NULL,
    "tco2eq" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'THB',
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reference_code" TEXT NOT NULL,
    "payment_channel" TEXT NOT NULL,
    "carbon_credit_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarbonCredit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,

    CONSTRAINT "CarbonCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuyTransaction_reference_code_key" ON "BuyTransaction"("reference_code");

-- AddForeignKey
ALTER TABLE "BuyTransaction" ADD CONSTRAINT "BuyTransaction_carbon_credit_id_fkey" FOREIGN KEY ("carbon_credit_id") REFERENCES "CarbonCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
