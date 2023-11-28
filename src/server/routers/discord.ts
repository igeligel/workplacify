import { Client } from "discord.js";
import { z } from "zod";

import { getUserFromSession } from "../queries/getUserFromSession";
import { publicProcedure, router } from "../trpc";

export const discordRouter = router({
  sendFeedback: publicProcedure
    .input(
      z.object({
        feedback: z.string(),
      }),
    )
    .mutation(async (resolverProps) => {
      const { input, ctx } = resolverProps;
      const user = await getUserFromSession(ctx.session, {
        includeOrganization: true,
      });
      const unparsedDiscordToken = process.env.DISCORD_TOKEN;
      if (typeof unparsedDiscordToken !== "string") {
        return;
      }
      const parsedDiscordToken = unparsedDiscordToken;
      const client = new Client({ intents: [] });
      client.login(parsedDiscordToken);
      const discordUser = await client.users.fetch("98424268034969600");
      await discordUser.send(`_ _
🚀🚀🚀 Received a new feature request 🚀🚀🚀
Date: ${new Date().toLocaleString()}
Feedback: ${input.feedback}
User Id: ${user.id}
Organization: ${user.organization?.id} - ${user.organization?.name}\n
`);
    }),
});
