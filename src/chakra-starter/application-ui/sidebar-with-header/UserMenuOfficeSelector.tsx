import { FiSettings } from "react-icons/fi";
import { useTranslations } from "use-intl";

import { trpc } from "../../../utils/trpc";
import { MenuItemPopover } from "./MenuItemPopover";
import { UserMenuOfficeSelectorList } from "./UserMenuOfficeSelectorList";
import { useMenuStore } from "./menuStore";

export const UserMenuOfficeSelector = () => {
  const t = useTranslations("AppMenu");
  const {
    isOfficeSelectorOpen,
    setIsOfficeSelectorOpen,
    isOfficeSelectorHighlighted,
    setIsOfficeSelectorHighlighted,
  } = useMenuStore();

  const userQuery = trpc.user.get.useQuery();
  const hasCurrentOfficeId =
    typeof userQuery.data?.currentOfficeId === "string";
  const officeQuery = trpc.office.getById.useQuery(
    { id: userQuery.data?.currentOfficeId || "" },
    {
      enabled: hasCurrentOfficeId,
    },
  );
  const officeListQuery = trpc.office.list.useQuery();

  if (!userQuery.isFetched) return null;
  if (!officeListQuery.isFetched) return null;

  if (hasCurrentOfficeId && !officeQuery.isFetched) {
    return null;
  }

  if (!officeListQuery.data) {
    // We should probably render an upsell to create an office.
    return null;
  }
  if (officeListQuery.data.length === 0) {
    // We should probably render an upsell to create an office.
    return null;
  }

  const title = officeQuery.data?.name
    ? t("selectedOffice", { officeName: officeQuery.data.name })
    : t("selectOffice");

  return (
    <MenuItemPopover
      title={title}
      controlled={{
        isOpen: isOfficeSelectorOpen,
        setIsOpen: (newOpenStatus) => {
          if (!newOpenStatus) {
            setIsOfficeSelectorHighlighted(false);
          }
          setIsOfficeSelectorOpen(newOpenStatus);
        },
      }}
      icon={FiSettings}
      submenu={<UserMenuOfficeSelectorList offices={officeListQuery.data} />}
      isHighlighted={isOfficeSelectorHighlighted}
    />
  );
};
