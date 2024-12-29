/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { faker } from "@faker-js/faker";
import { PrismaClient, UserRole } from "@prisma/client";
import { addHours, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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
  const desk3 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "3",
      x: 653.4755608974358,
      y: 159.6861227964743,
    },
  });
  const desk4 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "4",
      x: 579.1566506410255,
      y: 293.4601612580128,
    },
  });
  const desk5 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "5",
      x: 737.3497596153845,
      y: 294.5218599759615,
    },
  });
  const desk6 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "6",
      x: 651.3521634615383,
      y: 444.2213792067307,
    },
  });
  const desk7 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "7",
      x: 1056.921073717949,
      y: 164.9946163862179,
    },
  });
  const desk8 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "8",
      x: 1048.427483974359,
      y: 325.3111227964743,
    },
  });
  const desk9 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "9",
      x: 371.0637019230769,
      y: 848.7285907451923,
    },
  });
  const desk10 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "10",
      x: 286.1278044871794,
      y: 985.6877253605768,
    },
  });
  const desk11 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "11",
      x: 445.3826121794871,
      y: 983.5643279246793,
    },
  });
  const desk12 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "12",
      x: 372.1254006410256,
      y: 1133.263847155449,
    },
  });
  const desk13 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "13",
      x: 713.9923878205127,
      y: 844.4817958733973,
    },
  });
  const desk14 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "14",
      x: 641.7968749999999,
      y: 986.7494240785255,
    },
  });
  const desk15 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "15",
      x: 806.3601762820512,
      y: 983.5643279246793,
    },
  });
  const desk16 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "16",
      x: 715.0540865384614,
      y: 1131.140449719551,
    },
  });
  const desk17 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "17",
      x: 1052.674278846154,
      y: 957.0218599759614,
    },
  });
  const desk18 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor1.id,
      publicDeskId: "18",
      x: 1051.612580128205,
      y: 1114.153270232372,
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
  const floor2desk1 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "1",
      x: 133.5,
      y: 346.90625,
    },
  });
  const floor2desk2 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "2",
      x: 248.5,
      y: 346.90625,
    },
  });
  const floor2desk3 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "3",
      x: 241.5,
      y: 461.90625,
    },
  });
  const floor2desk4 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "4",
      x: 134.5,
      y: 464.90625,
    },
  });
  const floor2desk5 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "5",
      x: 443.5,
      y: 380.90625,
    },
  });
  const floor2desk6 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "6",
      x: 441.5,
      y: 472.90625,
    },
  });
  const floor2desk7 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "7",
      x: 579.5,
      y: 379.90625,
    },
  });
  const floor2desk8 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "8",
      x: 581.5,
      y: 476.90625,
    },
  });
  const floor2desk9 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "9",
      x: 765.5,
      y: 342.90625,
    },
  });
  const floor2desk10 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "10",
      x: 885.5,
      y: 207.90625,
    },
  });
  const floor2desk11 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "11",
      x: 888.5,
      y: 343.90625,
    },
  });
  const floor2desk12 = await prisma.desk.create({
    data: {
      floorId: berlinOffice1Floor2.id,
      publicDeskId: "12",
      x: 758.5,
      y: 460.90625,
    },
  });
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
