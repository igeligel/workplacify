import { useTranslations } from "next-intl";

import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartedModuleOfficeCreate = () => {
  const t = useTranslations("GetStartedModule");

  return (
    <GetStartedLink
      href={"/app/offices/new"}
      heading={t("officeCreateHeading")}
      imageSource={"/office-creation-preview.png"}
      imageAlt={t("officeCreateImageAlt")}
      badges={<GetStartedBadge>{t("officeCreateBadgeNew")}</GetStartedBadge>}
    />
  );
};
