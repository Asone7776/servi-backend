-- DropForeignKey
ALTER TABLE "car_type_translations" DROP CONSTRAINT "car_type_translations_carTypeId_fkey";

-- AddForeignKey
ALTER TABLE "car_type_translations" ADD CONSTRAINT "car_type_translations_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "car_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
