import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { validateCurrentOfficeSet } from "../queries/validateCurrentOfficeSet";
import { validateUserHasOrganization } from "../queries/validateUserHasOrganization";
import { publicProcedure, router } from "../trpc";

export const officeSettingRouter = router({
  getForCurrentOffice: publicProcedure.query(async (resolverProps) => {
    const { ctx } = resolverProps;
    const user = await getUserFromSession(ctx.session, {
      includeOrganization: true,
    });
    await validateUserHasOrganization(user);
    await validateCurrentOfficeSet(user);

    if (!user.currentOfficeId) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "You are not part of an office. Select an office first.",
      });
    }

    const office = await prisma.office.findFirst({
      where: { id: user.currentOfficeId },
      include: {
        officeSetting: {
          include: {
            officeSettingWeekdaysAllowed: true,
          },
        },
      },
    });

    console.log("OFFICE-SETTING-FOR-USER-START");
    console.log(JSON.stringify(office?.officeSetting, null, 2));
    console.log("OFFICE-SETTING-FOR-USER-END");

    return office?.officeSetting;
  }),
  get: publicProcedure
    .input(
      z.object({
        officeId: z.string(),
      }),
    )
    .query(async (resolverProps) => {
      const { ctx } = resolverProps;
      const { officeId } = resolverProps.input;
      let organizationId: string | null = null;
      try {
        const user = await getUserFromSession(ctx.session, {
          includeOrganization: true,
        });
        if (!user.organizationId) {
          throw new Error("User has no organizationId");
        }
        if (user.userRole !== UserRole.ADMIN) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not allowed to access this resource",
          });
        }
        organizationId = user.organizationId;
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action",
        });
      }

      if (!organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not part of an organization",
        });
      }

      const office = await prisma.office.findFirst({
        where: {
          id: officeId,
          organizationId,
        },
        include: {
          officeSetting: {
            include: {
              officeSettingWeekdaysAllowed: true,
            },
          },
        },
      });

      console.log("OFFICE-START");
      console.log(JSON.stringify(office, null, 2));
      console.log("OFFICE-END");

      return office?.officeSetting;
    }),
  createOrUpdate: publicProcedure
    .input(
      z.object({
        officeId: z.string(),
        allowSchedulingInThePast: z.boolean(),
        durationSchedulingFuture: z.number().optional(),
        officeSettingWeekdaysAllowed: z.array(z.string()).nullable(),
      }),
    )
    .mutation(async (resolverProps) => {
      const { ctx, input } = resolverProps;
      // Make sure user is admin and get organizationId
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      if (user.userRole !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this resource",
        });
      }

      let organizationId: string | null = null;
      try {
        const user = await getUserFromSession(ctx.session, {
          includeOrganization: true,
        });
        organizationId = user.organizationId;
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action",
        });
      }

      // Get the office.

      const {
        officeId,
        allowSchedulingInThePast,
        durationSchedulingFuture,
        officeSettingWeekdaysAllowed,
      } = input;

      const office = await prisma.office.findFirst({
        where: {
          id: officeId,
          organizationId,
        },
        include: {
          officeSetting: {
            include: {
              officeSettingWeekdaysAllowed: true,
            },
          },
        },
      });
      if (!office) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Office not found",
        });
      }

      const hasAnyDaysAllowed = (officeSettingWeekdaysAllowed?.length || 0) > 0;

      console.log({ durationSchedulingFuture });

      const officeSetting = await prisma.officeSetting.upsert({
        where: {
          id: office.officeSettingId || "",
        },
        include: {
          officeSettingWeekdaysAllowed: true,
        },
        create: {
          allowSchedulingInThePast: allowSchedulingInThePast,
          durationSchedulingFuture: durationSchedulingFuture || null,
          officeSettingWeekdaysAllowed: {
            connectOrCreate: hasAnyDaysAllowed
              ? {
                  where: {
                    id: office.id,
                  },
                  create: {
                    allowMonday:
                      officeSettingWeekdaysAllowed?.includes("monday"),
                    allowTuesday:
                      officeSettingWeekdaysAllowed?.includes("tuesday"),
                    allowWednesday:
                      officeSettingWeekdaysAllowed?.includes("wednesday"),
                    allowThursday:
                      officeSettingWeekdaysAllowed?.includes("thursday"),
                    allowFriday:
                      officeSettingWeekdaysAllowed?.includes("friday"),
                    allowSaturday:
                      officeSettingWeekdaysAllowed?.includes("saturday"),
                    allowSunday:
                      officeSettingWeekdaysAllowed?.includes("sunday"),
                  },
                }
              : undefined,
          },
        },
        update: {
          allowSchedulingInThePast: allowSchedulingInThePast,
          durationSchedulingFuture: durationSchedulingFuture || null,
          officeSettingWeekdaysAllowed: {
            ...(!hasAnyDaysAllowed ? { disconnect: true } : {}),
            connectOrCreate: {
              where: {
                id: office.id,
              },
              create: {
                allowMonday: officeSettingWeekdaysAllowed?.includes("monday"),
                allowTuesday: officeSettingWeekdaysAllowed?.includes("tuesday"),
                allowWednesday:
                  officeSettingWeekdaysAllowed?.includes("wednesday"),
                allowThursday:
                  officeSettingWeekdaysAllowed?.includes("thursday"),
                allowFriday: officeSettingWeekdaysAllowed?.includes("friday"),
                allowSaturday:
                  officeSettingWeekdaysAllowed?.includes("saturday"),
                allowSunday: officeSettingWeekdaysAllowed?.includes("sunday"),
              },
            },
          },
        },
      });

      const updatedOffice = await prisma.office.update({
        where: {
          id: officeId,
        },
        include: {
          officeSetting: {
            include: {
              officeSettingWeekdaysAllowed: true,
            },
          },
        },
        data: {
          officeSetting: {
            connect: {
              id: officeSetting.id,
            },
          },
        },
      });

      return updatedOffice.officeSetting;
    }),
});
