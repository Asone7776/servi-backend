-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- CreateTable
CREATE TABLE "car_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_type_translations" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT,
    "carTypeId" INTEGER NOT NULL,

    CONSTRAINT "car_type_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "carTypeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies_on_users" (
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_on_users_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_types_type_key" ON "car_types"("type");

-- CreateIndex
CREATE INDEX "car_types_type_idx" ON "car_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "car_type_translations_language_carTypeId_key" ON "car_type_translations"("language", "carTypeId");

-- AddForeignKey
ALTER TABLE "car_type_translations" ADD CONSTRAINT "car_type_translations_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "car_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "car_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_on_users" ADD CONSTRAINT "companies_on_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_on_users" ADD CONSTRAINT "companies_on_users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
