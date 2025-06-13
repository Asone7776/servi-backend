/*
  Warnings:

  - Made the column `title` on table `car_type_translations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "car_type_translations" ALTER COLUMN "title" SET NOT NULL;
