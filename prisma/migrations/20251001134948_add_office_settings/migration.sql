-- AlterTable
ALTER TABLE "office" ADD COLUMN     "office_setting_id" TEXT;

-- CreateTable
CREATE TABLE "office_setting" (
    "id" TEXT NOT NULL,
    "allow_scheduling_in_the_past" BOOLEAN NOT NULL DEFAULT false,
    "duration_scheduling_future" INTEGER,
    "office_setting_weekdays_allowed_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "office_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "office_setting_weekdays_allowed" (
    "id" TEXT NOT NULL,
    "allow_monday" BOOLEAN NOT NULL DEFAULT true,
    "allow_tuesday" BOOLEAN NOT NULL DEFAULT true,
    "allow_wednesday" BOOLEAN NOT NULL DEFAULT true,
    "allow_thursday" BOOLEAN NOT NULL DEFAULT true,
    "allow_friday" BOOLEAN NOT NULL DEFAULT true,
    "allow_saturday" BOOLEAN NOT NULL DEFAULT true,
    "allow_sunday" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "office_setting_weekdays_allowed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "office" ADD CONSTRAINT "office_office_setting_id_fkey" FOREIGN KEY ("office_setting_id") REFERENCES "office_setting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office_setting" ADD CONSTRAINT "office_setting_office_setting_weekdays_allowed_id_fkey" FOREIGN KEY ("office_setting_weekdays_allowed_id") REFERENCES "office_setting_weekdays_allowed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
