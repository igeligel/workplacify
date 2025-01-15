import { useTranslations } from "next-intl";

import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartGetStartedScheduleDesk = () => {
  const t = useTranslations("GetStartedModule");

  return (
    <GetStartedLink
      href={"/app/schedule"}
      heading={t("scheduleDeskHeading")}
      imageSource={"/get-started-schedule-desk.png"}
      imageAlt={t("scheduleDeskImageAlt")}
      badges={<GetStartedBadge>{t("scheduleDeskBadgeNew")}</GetStartedBadge>}
    />
  );
};
