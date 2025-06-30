/*
  Warnings:

  - You are about to drop the `BannerMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BannerMedia" DROP CONSTRAINT "BannerMedia_banner_id_fkey";

-- DropForeignKey
ALTER TABLE "BannerMedia" DROP CONSTRAINT "BannerMedia_media_id_fkey";

-- DropTable
DROP TABLE "BannerMedia";

-- CreateTable
CREATE TABLE "banners_media" (
    "id" SERIAL NOT NULL,
    "banner_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banners_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "banners_media_banner_id_media_id_idx" ON "banners_media"("banner_id", "media_id");

-- CreateIndex
CREATE UNIQUE INDEX "banners_media_media_id_banner_id_key" ON "banners_media"("media_id", "banner_id");

-- AddForeignKey
ALTER TABLE "banners_media" ADD CONSTRAINT "banners_media_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banners_media" ADD CONSTRAINT "banners_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
