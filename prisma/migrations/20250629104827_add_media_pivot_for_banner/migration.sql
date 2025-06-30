/*
  Warnings:

  - You are about to drop the column `entity` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `entity_id` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "entity",
DROP COLUMN "entity_id";

-- CreateTable
CREATE TABLE "BannerMedia" (
    "id" SERIAL NOT NULL,
    "banner_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BannerMedia_banner_id_media_id_idx" ON "BannerMedia"("banner_id", "media_id");

-- CreateIndex
CREATE UNIQUE INDEX "BannerMedia_media_id_banner_id_key" ON "BannerMedia"("media_id", "banner_id");

-- AddForeignKey
ALTER TABLE "BannerMedia" ADD CONSTRAINT "BannerMedia_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerMedia" ADD CONSTRAINT "BannerMedia_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
