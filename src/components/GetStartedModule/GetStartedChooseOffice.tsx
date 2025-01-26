import { useTranslations } from "next-intl";

import { useMenuStore } from "../../chakra-starter/application-ui/sidebar-with-header/menuStore";
import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedButtonLink } from "./GetStartedButtonLink";

export const GetStartedChooseOffice = () => {
  const t = useTranslations("GetStartedModule");

  const {
    setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted,
    setIsSidebarOpen,
  } = useMenuStore();

  const openSidebarAndOfficeSelector = () => {
    setIsSidebarOpen(true);
    setIsOfficeSelectorOpen(true);
    setIsOfficeSelectorHighlighted(true);
  };

  return (
    <GetStartedButtonLink
      badges={<GetStartedBadge>{t("chooseOfficeBadgeNew")}</GetStartedBadge>}
      heading={t("chooseOfficeHeading")}
      imageSource={"/get-started-select-office.png"}
      imageAlt={t("chooseOfficeImageAlt")}
      onClick={openSidebarAndOfficeSelector}
    />
  );
};
