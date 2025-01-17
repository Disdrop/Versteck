import { createEvent, filename } from "../../../lib/utils.js";
import { ActivityType, Events } from "discord.js";

export default await createEvent({
  name: filename(import.meta.filename),
  description: "This event sets the Bots activity at Startup.",
  eventType: Events.ClientReady,
  async execute(client, ready) {
    if (!client.user) return;
    console.log(`[Discord] Online als ${client.user.tag}`);

    // Getting Guild
    const guild = client.guilds.cache.get(process.env.SERVER_ID as string);
    if (!guild) return;
    client.user.setActivity(`${guild.memberCount} User`, {
      type: ActivityType.Listening,
    });
  },
});
