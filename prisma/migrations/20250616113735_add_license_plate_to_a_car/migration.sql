/*
  Warnings:

  - Added the required column `license_plate` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "license_plate" TEXT NOT NULL;
