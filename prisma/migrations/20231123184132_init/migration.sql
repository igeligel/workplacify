-- AlterTable
ALTER TABLE "desk" ADD COLUMN     "floor_id" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "current_office_id" TEXT;

-- AddForeignKey
ALTER TABLE "desk" ADD CONSTRAINT "desk_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_current_office_id_fkey" FOREIGN KEY ("current_office_id") REFERENCES "office"("id") ON DELETE SET NULL ON UPDATE CASCADE;
