-- CreateEnum
CREATE TYPE "BannerLocations" AS ENUM ('TOP', 'MIDDLE', 'BOTTOM');

-- CreateTable
CREATE TABLE "banners" (
    "id" SERIAL NOT NULL,
    "position" INTEGER,
    "is_main" BOOLEAN DEFAULT false,
    "location" "BannerLocations" NOT NULL DEFAULT 'TOP',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "entity_id" INTEGER NOT NULL,
    "entity" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);
