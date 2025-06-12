/*
  Warnings:

  - You are about to drop the column `carTypeId` on the `car_type_translations` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `car_type_translations` table. All the data in the column will be lost.
  - You are about to drop the column `carTypeId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `companies_on_users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lang,car_type_id]` on the table `car_type_translations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_type_id` to the `car_type_translations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `car_type_translations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_type_id` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "car_type_translations" DROP CONSTRAINT "car_type_translations_carTypeId_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_carTypeId_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_userId_fkey";

-- DropForeignKey
ALTER TABLE "companies_on_users" DROP CONSTRAINT "companies_on_users_companyId_fkey";

-- DropForeignKey
ALTER TABLE "companies_on_users" DROP CONSTRAINT "companies_on_users_userId_fkey";

-- DropIndex
DROP INDEX "car_type_translations_language_carTypeId_key";

-- AlterTable
ALTER TABLE "car_type_translations" DROP COLUMN "carTypeId",
DROP COLUMN "language",
ADD COLUMN     "car_type_id" INTEGER NOT NULL,
ADD COLUMN     "lang" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "carTypeId",
DROP COLUMN "userId",
ADD COLUMN     "car_type_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "companies_on_users";

-- CreateTable
CREATE TABLE "company_users" (
    "company_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_users_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateIndex
CREATE INDEX "company_users_company_id_user_id_idx" ON "company_users"("company_id", "user_id");

-- CreateIndex
CREATE INDEX "car_type_translations_car_type_id_idx" ON "car_type_translations"("car_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "car_type_translations_lang_car_type_id_key" ON "car_type_translations"("lang", "car_type_id");

-- CreateIndex
CREATE INDEX "cars_user_id_car_type_id_idx" ON "cars"("user_id", "car_type_id");

-- AddForeignKey
ALTER TABLE "car_type_translations" ADD CONSTRAINT "car_type_translations_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "car_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "car_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
