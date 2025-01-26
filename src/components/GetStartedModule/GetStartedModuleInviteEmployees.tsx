import { useTranslations } from "next-intl";

import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartedModuleInviteEmployees = () => {
  const t = useTranslations("GetStartedModule");

  return (
    <GetStartedLink
      href={"/app/organization-settings"}
      heading={t("inviteEmployeesHeading")}
      imageSource={"/get-started-invite-colleagues.png"}
      imageAlt={t("inviteEmployeesImageAlt")}
      badges={
        <>
          <GetStartedBadge colorScheme="green">
            {t("inviteEmployeesBadgeRecommended")}
          </GetStartedBadge>
          <GetStartedBadge>{t("inviteEmployeesBadgeNew")}</GetStartedBadge>
        </>
      }
    />
  );
};
