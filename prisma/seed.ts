/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { faker } from "@faker-js/faker";
import { Office, PrismaClient, User, UserRole } from "@prisma/client";
import { randomInt } from "crypto";
import {
  add,
  addHours,
  eachWeekOfInterval,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

const prisma = new PrismaClient();

/**
 * Generates a random number following a normal (Gaussian) distribution.
 * Uses the Box-Muller transform.
 */
function randomNormal(mean = 0, stdDev = 1): number {
  let u = 0,
    v = 0;
  while (u === 0) {
    // Replace with crypto.randomInt(0, 1)

    u = randomInt(0, 1000) / 1000.0;
  }
  while (v === 0) {
    v = randomInt(0, 1000) / 1000.0;
  }
  return (
    mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  );
}

/**
 * Generates attendance for weekdays based on a normal distribution.
 *
 * @param meanDays - average number of days attended per week (default 3)
 * @param stdDev - standard deviation (default 1.2 for more spread)
 * @returns an object with weekday attendance booleans
 */
function generateWeeklyAttendance(
  meanDays = 3,
  stdDev = 1.2,
): Record<string, boolean> {
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // Draw from normal distribution and clamp between 0 and 5
  const attendedDays = Math.round(
    Math.min(Math.max(randomNormal(meanDays, stdDev), 0), 5),
  );

  // Shuffle weekdays randomly
  const shuffled = [...weekdays].sort(() => Math.random() - 0.5);

  // Pick the first N days as attended
  const attendedSet = new Set(shuffled.slice(0, attendedDays));

  // Build result object
  const attendance: Record<string, boolean> = {};
  for (const day of weekdays) {
    attendance[day] = attendedSet.has(day);
  }

  return attendance;
}

type CreateHistoricalDataProps = {
  users: User[];
  office: Office;
};

const createHistoricalData = async (props: CreateHistoricalDataProps) => {
  const floorsWithDesks = await prisma.floor.findMany({
    where: {
      officeId: props.office.id,
    },
    include: {
      desks: true,
    },
  });
  const baseAllDesksForOffice = floorsWithDesks.flatMap((floor) => floor.desks);

  type CreationPayload = {
    userId: string;
    deskId: string;
    date: Date;
    timezone: string;
    wholeDay: boolean;
    startTime: Date;
    endTime: Date;
  };
  const creationPayloads: CreationPayload[] = [];

  eachWeekOfInterval({
    start: add(new Date(), { weeks: -104 }),
    end: add(new Date(), { weeks: 2 }),
  }).flatMap((week) => {
    const beginningOfWeek = startOfWeek(week, { weekStartsOn: 1 });
    const userWeekAttendanceMap = new Map<string, Record<string, boolean>>();
    props.users.forEach((user) => {
      const attendance = generateWeeklyAttendance();
      userWeekAttendanceMap.set(user.id, attendance);
    });

    ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
      const desksForTheDay = [...baseAllDesksForOffice];
      // Shuffle desks for the day
      // Shuffle desks properly for each day based on crypto.
      const shuffledDesks = desksForTheDay.sort(() => {
        return randomInt(-1, 1);
      });

      // For each user, check the attendance for the day and if they are attending, create a desk schedule for them
      for (const user of props.users) {
        const attendance = userWeekAttendanceMap.get(user.id);
        if (attendance?.[day]) {
          const desk = shuffledDesks.shift();
          if (desk) {
            const dayIndex = [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
            ].indexOf(day);
            const zonedDate = toZonedTime(
              add(beginningOfWeek, { days: dayIndex - 1 }),
              props.office.timezone,
            );
            creationPayloads.push({
              userId: user.id,
              deskId: desk.id,
              date: zonedDate,
              timezone: props.office.timezone,
              wholeDay: true,
              startTime: zonedDate,
              endTime: addHours(zonedDate, 24),
            });
          }
        }
      }
    });
  });

  await prisma.deskSchedule.createMany({
    data: creationPayloads,
  });
};

async function main() {
  // console.log({ prisma });

  const isOrganizationExisting = await prisma.organization.findFirst({
    where: {
      name: "Acme Inc.",
    },
  });
  if (isOrganizationExisting) {
    console.log("✅✅✅ SEED ALREADY DONE ✅✅✅");
    console.log(
      "Use the invite code to join an organization with data: ",
      isOrganizationExisting.inviteCode,
    );
    console.log("✅✅✅ END of seed description ✅✅✅");
    return;
  }

  const organization = await prisma.organization.create({
    data: {
      name: "Acme Inc.",
      description: `Acme Inc. is a pioneering company committed to reshaping industries through innovation. Our diverse team of experts collaborates to create cutting-edge solutions in software development, artificial intelligence, renewable energy, and biotechnology.

      We are driven by a passion for pushing boundaries and setting new standards. Sustainability and ethical practices are at the core of our operations, ensuring our innovations contribute to a better world.

      At Acme Inc., customer satisfaction is paramount. We focus on understanding our clients' needs, delivering tailored solutions, and fostering enduring partnerships.

      We're more than a company; we're trailblazers, dedicated to driving progress and shaping a brighter future through innovation and excellence.`,
    },
  });

  const berlinOffice1 = await prisma.office.create({
    data: {
      name: "Berlin Office #1 - Gesundbrunnen",
      description: `
      Berlin Office #1 at Acme Inc. epitomizes engineering brilliance within our organization. Strategically located in Berlin's tech hub, this center is home to a team of skilled engineers dedicated to driving technological innovation. Our engineers collaborate across diverse domains, from software development to cutting-edge research, consistently delivering solutions that redefine industry standards. With an unwavering commitment to quality and innovation, this office plays a pivotal role in advancing Acme Inc.'s global engineering endeavors.

      Nestled in Berlin's progressive atmosphere, Berlin Office #1 thrives on a culture of calculated risk-taking and continual improvement. Inspired by the city's innovative spirit, our engineers foster a dynamic environment that encourages creative problem-solving and sets the stage for groundbreaking achievements. This office stands as a testament to Acme Inc.'s dedication to engineering excellence and its relentless pursuit of shaping the future of technology.`,
      timezone: "Europe/Berlin",
      organizationId: organization.id,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });
  const user3 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });
  const user4 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });
  const user5 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });

  const user6 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });

  const user7 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      organizationId: organization.id,
      userRole: UserRole.MEMBER,
      currentOfficeId: berlinOffice1.id,
    },
  });

  await prisma.office.create({
    data: {
      name: "Berlin Office #2 - Potsdamer Platz",
      description: `Berlin Office #2 is the bustling hub of marketing and sales endeavors within Acme Inc. Strategically positioned in Berlin's vibrant landscape, this office orchestrates our company's market penetration and revenue amplification.

      Comprised of adept marketing strategists and sales professionals, this office is dedicated to crafting compelling campaigns and fostering strong client relationships. Through innovative marketing strategies and customer-centric sales approaches, our team ensures that Acme Inc.'s innovative solutions resonate with our diverse clientele. Situated in Berlin's dynamic environment, this office epitomizes our commitment to delivering unparalleled value to customers while propelling the company's growth trajectory through pioneering marketing and sales initiatives.`,
      timezone: "Europe/Berlin",
      organizationId: organization.id,
    },
  });

  await prisma.office.create({
    data: {
      name: "Bengaluru Office #1",
      description: `Bengaluru Office #1 is the epicenter of Acme Inc.'s global operations. Located in Bengaluru's thriving tech hub, this office is home to a diverse team of experts dedicated to driving innovation and excellence across the company's global endeavors.

      Our team of talented engineers, marketers, sales professionals, and researchers collaborate to deliver cutting-edge solutions that set new industry standards. With a focus on quality and innovation, this office is committed to delivering value to customers and driving Acme Inc.'s growth trajectory. Situated in Bengaluru's progressive environment, this office epitomizes Acme Inc.'s commitment to engineering brilliance and its relentless pursuit of shaping the future of technology.`,
      timezone: "Asia/Kolkata",
      organizationId: organization.id,
    },
  });

  const berlinOffice1Floor1 = await prisma.floor.create({
    data: {
      name: "Floor 1",
      description: `Floor 1 at Berlin Office #1 is a vibrant workspace that fosters collaboration and creativity. This floor is home to a diverse team of engineers dedicated to driving innovation across Acme Inc.'s global endeavors. With a focus on quality and excellence, this floor is committed to delivering cutting-edge solutions that set new industry standards. Situated in Berlin's dynamic environment, Floor 1 epitomizes Acme Inc.'s commitment to engineering brilliance and its relentless pursuit of shaping the future of technology.`,
      officeId: berlinOffice1.id,
      floorPlan:
        "http://res.cloudinary.com/dpfc44mfl/image/upload/v1701200863/floor_plans/impxvy3dob2r7n1iupqc.png",
    },
  });

  const floor1desk1 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "1",
      x: 262.7704326923077,
      y: 166.0563151041667,
    },
  });
  const floor1desk2 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "2",
      x: 264.8938301282051,
      y: 326.372821514423,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor1desk3 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "3",
      x: 653.4755608974358,
      y: 159.6861227964743,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor1desk4 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "4",
      x: 579.1566506410255,
      y: 293.4601612580128,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const desk5 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "5",
      x: 737.3497596153845,
      y: 294.5218599759615,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const desk6 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "6",
      x: 651.3521634615383,
      y: 444.2213792067307,
    },
  });

  const berlinOffice1Floor2 = await prisma.floor.create({
    data: {
      name: "Floor 2",
      description: `Floor 2 at Berlin Office #1 is a vibrant workspace that fosters collaboration and creativity. This floor is home to a diverse team of engineers dedicated to driving innovation across Acme Inc.'s global endeavors. With a focus on quality and excellence, this floor is committed to delivering cutting-edge solutions that set new industry standards. Situated in Berlin's dynamic environment, Floor 2 epitomizes Acme Inc.'s commitment to engineering brilliance and its relentless pursuit of shaping the future of technology.`,
      officeId: berlinOffice1.id,
      floorPlan:
        "http://res.cloudinary.com/dpfc44mfl/image/upload/v1701200327/floor_plans/s1bjbtkfiwtdpjiegvjl.png",
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk1 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "1",
      x: 133.5,
      y: 346.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk2 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "2",
      x: 248.5,
      y: 346.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk3 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "3",
      x: 241.5,
      y: 461.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk4 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "4",
      x: 134.5,
      y: 464.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk5 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "5",
      x: 443.5,
      y: 380.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk6 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "6",
      x: 441.5,
      y: 472.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk7 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "7",
      x: 579.5,
      y: 379.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk8 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "8",
      x: 581.5,
      y: 476.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk9 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "9",
      x: 765.5,
      y: 342.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk10 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "10",
      x: 885.5,
      y: 207.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk11 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "11",
      x: 888.5,
      y: 343.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk12 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "12",
      x: 758.5,
      y: 460.90625,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floor2desk13 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "13",
      x: 894.5,
      y: 464.90625,
    },
  });

  const startOfDayDate = startOfDay(new Date());
  // UTC
  const zonedDate = toZonedTime(startOfDayDate, berlinOffice1.timezone);

  await prisma.deskSchedule.create({
    data: {
      userId: user1.id,
      deskId: floor1desk1.id,
      date: zonedDate,
      timezone: berlinOffice1.timezone,
      wholeDay: true,
      startTime: zonedDate,
      endTime: addHours(zonedDate, 24),
    },
  });
  await prisma.deskSchedule.create({
    data: {
      userId: user2.id,
      deskId: floor1desk2.id,
      date: zonedDate,
      timezone: berlinOffice1.timezone,
      wholeDay: true,
      startTime: zonedDate,
      endTime: addHours(zonedDate, 24),
    },
  });

  const userCreationgPromises = new Array(20).fill(0).map(() => {
    return prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        organizationId: organization.id,
        userRole: UserRole.MEMBER,
        currentOfficeId: berlinOffice1.id,
      },
    });
  });
  const analyticsUsers = await Promise.all(userCreationgPromises);

  // Analytics
  await createHistoricalData({
    users: [user1, user2, user3, user4, user5, user6, user7, ...analyticsUsers],
    office: berlinOffice1,
  });

  const inviteCode = organization.inviteCode;
  console.log("✅✅✅ SEED SUCCEEDED ✅✅✅");
  console.log(
    "Use the invite code to join an organization with data: ",
    inviteCode,
  );
  console.log("✅✅✅ END of seed description ✅✅✅");
  return;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
