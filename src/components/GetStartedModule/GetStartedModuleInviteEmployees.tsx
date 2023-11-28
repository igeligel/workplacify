import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartedModuleInviteEmployees = () => {
  return (
    <GetStartedLink
      href={"/app/organization-settings"}
      heading={"Invite your colleagues"}
      imageSource={"/get-started-invite-colleagues.png"}
      imageAlt={"A preview on how it looks like to invite colleagues"}
      badges={
        <>
          <GetStartedBadge colorScheme="green">recommended</GetStartedBadge>
          <GetStartedBadge>new</GetStartedBadge>
        </>
      }
    />
  );
};
