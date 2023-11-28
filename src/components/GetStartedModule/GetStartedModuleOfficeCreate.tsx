import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartedModuleOfficeCreate = () => {
  return (
    <GetStartedLink
      href={"/app/offices/new"}
      heading={"Create a new office"}
      imageSource={"/office-creation-preview.png"}
      imageAlt={"A preview on how it looks like to create an office"}
      badges={<GetStartedBadge>new</GetStartedBadge>}
    />
  );
};
