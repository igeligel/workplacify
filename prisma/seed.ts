/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { faker } from "@faker-js/faker";
import { PrismaClient, UserRole } from "@prisma/client";
import { addHours, parseISO, startOfDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const prisma = new PrismaClient();

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

  // const bengaluruOffice1 =
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
        "http://res.cloudinary.com/dpfc44mfl/image/upload/v1701020948/floor_plans/bxdioepma89ezqsljzfr.png",
    },
  });

  const desk1 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "1",
      x: 1139.44391025641,
      y: 434.6709735576923,
    },
  });
  const desk2 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "2",
      x: 544.2836538461539,
      y: 444.2703325320513,
    },
  });
  const desk3 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "3",
      x: 546.2035256410257,
      y: 688.0940504807693,
    },
  });
  const desk4 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "4",
      x: 1139.44391025641,
      y: 860.8825120192308,
    },
  });
  const desk5 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "5",
      x: 1022.331730769231,
      y: 642.0171274038462,
    },
  });
  const desk6 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "6",
      x: 1268.075320512821,
      y: 642.0171274038462,
    },
  });

  // const berlinOffice1Floor2 =
  await prisma.floor.create({
    data: {
      name: "Floor 2",
      description: `Floor 2 at Berlin Office #1 is a vibrant workspace that fosters collaboration and creativity. This floor is home to a diverse team of engineers dedicated to driving innovation across Acme Inc.'s global endeavors. With a focus on quality and excellence, this floor is committed to delivering cutting-edge solutions that set new industry standards. Situated in Berlin's dynamic environment, Floor 2 epitomizes Acme Inc.'s commitment to engineering brilliance and its relentless pursuit of shaping the future of technology.`,
      officeId: berlinOffice1.id,
      // TODO - add floor plan
    },
  });

  const startOfDayDate = startOfDay(new Date());
  // UTC
  const zonedDate = utcToZonedTime(startOfDayDate, berlinOffice1.timezone);

  await prisma.deskSchedule.create({
    data: {
      userId: user1.id,
      deskId: desk1.id,
      date: zonedDate,
      timezone: berlinOffice1.timezone,
      wholeDay: true,
      startTime: zonedDate,
      endTime: addHours(zonedDate, 24),
    },
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
