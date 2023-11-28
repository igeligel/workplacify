import { UserRole } from "@prisma/client";

import { GetStartedChooseOffice } from "../components/GetStartedModule/GetStartedChooseOffice";
import { GetStartedModuleInviteEmployees } from "../components/GetStartedModule/GetStartedModuleInviteEmployees";
import { GetStartedModuleOfficeCreate } from "../components/GetStartedModule/GetStartedModuleOfficeCreate";
import { GetStartGetStartedScheduleDesk } from "../components/GetStartedModule/GetStartedScheduleDesk";
import { trpc } from "../utils/trpc";

type ModuleDefinition = {
  uuid: string;
  Component: () => JSX.Element;
};

export const useGetStartedModules = () => {
  const userQuery = trpc.user.get.useQuery();
  const isLoading = userQuery.isLoading;

  const modules: ModuleDefinition[] = [];
  if (userQuery.data?.userRole === UserRole.ADMIN) {
    modules.push(
      {
        uuid: "ded61182-d121-4046-b938-d2ffdfae474b",
        Component: GetStartedModuleOfficeCreate,
      },
      {
        uuid: "9c662f87-ec4c-4418-bf68-b6ed41854565",
        Component: GetStartedModuleInviteEmployees,
      },
    );
  } else if (userQuery.data?.userRole === UserRole.MEMBER) {
    modules.push(
      {
        uuid: "3885c9b4-0cac-471c-b495-a2b641697759",
        Component: GetStartGetStartedScheduleDesk,
      },
      {
        uuid: "c6d40dd7-d212-4906-81ae-90d014bbe3af",
        Component: GetStartedChooseOffice,
      },
    );
  }

  return {
    isLoading,
    modules,
  };
};
