import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedLink } from "./GetStartedLink";

export const GetStartGetStartedScheduleDesk = () => {
  return (
    <GetStartedLink
      href={"/app/schedule"}
      heading={"Schedule a desk for the next days"}
      imageSource={"/get-started-schedule-desk.png"}
      imageAlt={
        "A preview on how it looks like to schedule a desk in workplacify"
      }
      badges={<GetStartedBadge>new</GetStartedBadge>}
    />
  );
};
