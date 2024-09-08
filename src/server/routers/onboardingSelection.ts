import { UserRole, WorkplacifyPreference } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "../../server/prisma";
import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const onboardingSelectionRouter = router({
  get: publicProcedure.query(async (resolveProps) => {
    const { ctx } = resolveProps;
    const user = await getUserFromSession(ctx.session, {});
    const onboardingSelection = await prisma.onboardingSelection.findFirst({
      where: {
        userId: user.id,
      },
    });
    return onboardingSelection;
  }),
  submit: publicProcedure.mutation(async (resolveProps) => {
    const { ctx } = resolveProps;
    const user = await getUserFromSession(ctx.session, {});
    const onboardingSelection = await prisma.onboardingSelection.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!onboardingSelection) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Onboarding selection not found",
      });
    }
    if (onboardingSelection.submitted) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Onboarding selection already submitted",
      });
    }

    // First validate if joining an organization
    const isJoiningOrganization =
      onboardingSelection.workplacifyPreferences.includes(
        WorkplacifyPreference.JOIN_ORGANIZATION,
      );

    const adminEmails = (process.env.ADMIN_EMAILS || "").split("|");
    const isAdmin = adminEmails.includes(user.email || "");

    if (isJoiningOrganization) {
      if (!onboardingSelection.temporaryInviteCode) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Temporary invite code missing",
        });
      }
      // Check orgs that have this invite code
      const organization = await prisma.organization.findFirst({
        where: {
          inviteCode: onboardingSelection.temporaryInviteCode,
        },
      });
      if (!organization) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Organization not found",
        });
      }
      // Check if user already in this org
      const userInOrg = await prisma.user.findFirst({
        where: {
          organizationId: organization.id,
          id: user.id,
        },
      });
      if (userInOrg) {
        // Still make them an admin if in admin emails
        if (process.env.NODE_ENV !== "production" && isAdmin) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              userRole: UserRole.ADMIN,
            },
          });
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already in organization",
        });
      }
      // Still make them an admin if in admin emails
      if (process.env.NODE_ENV !== "production" && isAdmin) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            userRole: UserRole.ADMIN,
          },
        });
      }
      // Add user to org
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
      });
    } else {
      // Check if user already in org
      if (user.organizationId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already in organization",
        });
      }
      // Create org
      await prisma.organization.create({
        data: {
          name: "Test organization",
          members: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          userRole: UserRole.ADMIN,
        },
      });
    }

    const updatedOnboardingSelection = await prisma.onboardingSelection.update({
      where: {
        id: onboardingSelection.id,
      },
      data: {
        submitted: true,
      },
    });

    return updatedOnboardingSelection;
  }),
  update: publicProcedure
    .input(
      z.object({
        submitted: z.boolean(),
        temporaryInviteCode: z.string().optional(),
        workplacifyPreferences: z.array(z.nativeEnum(WorkplacifyPreference)),
      }),
    )
    .mutation(async (resolveProps) => {
      const { ctx } = resolveProps;
      const user = await getUserFromSession(ctx.session, {});
      const onboardingSelection = await prisma.onboardingSelection.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!onboardingSelection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Onboarding selection not found",
        });
      }
      if (onboardingSelection.submitted) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Onboarding selection already submitted",
        });
      }

      const updatedOnboardingSelection =
        await prisma.onboardingSelection.update({
          where: {
            id: onboardingSelection.id,
          },
          data: {
            submitted: resolveProps.input.submitted,
            temporaryInviteCode: resolveProps.input.temporaryInviteCode,
            workplacifyPreferences: {
              set: resolveProps.input.workplacifyPreferences,
            },
          },
        });

      return updatedOnboardingSelection;
    }),
  add: publicProcedure
    .input(
      z.object({
        submitted: z.boolean(),
        temporaryInviteCode: z.string().optional(),
        workplacifyPreferences: z.array(z.nativeEnum(WorkplacifyPreference)),
      }),
    )
    .mutation(async (resolveProps) => {
      const { ctx } = resolveProps;
      const user = await getUserFromSession(ctx.session, {});
      // Only create if not existing
      const onboardingSelection = await prisma.onboardingSelection.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (onboardingSelection) {
        return null;
      }
      const createdOnboardingSelection =
        await prisma.onboardingSelection.create({
          data: {
            submitted: false,
            user: {
              connect: {
                id: user.id,
              },
            },
            temporaryInviteCode: "",
            workplacifyPreferences: {
              set: [WorkplacifyPreference.DESK_BOOKING],
            },
          },
        });
      return createdOnboardingSelection;
    }),
});
