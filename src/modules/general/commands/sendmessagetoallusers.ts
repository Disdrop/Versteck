import { SlashCommandBuilder, PermissionFlagsBits as PFB } from "discord.js";
import { createCommand, filename } from "../../../lib/utils.js";
import message from "../messages/message.js";

export default await createCommand({
  data: new SlashCommandBuilder()
    .setName(filename(import.meta.url))
    .setDescription("Sendet eine Nachricht an jedes Mitglied")
    .setDefaultMemberPermissions(PFB.Administrator),
  async execute(client, interaction) {
    await interaction.reply("Nachrichten werden gesendet...");

    let members = await interaction.guild?.members.fetch();
    if (!members) return;
    let i = 1;
    let j = 0;
    for (const member of members) {
      if (member[1].user.bot) continue;
      j++;
    }
    for (const member of members) {
      let m = member[1];
      if (m.user.bot) return;
      m.send(`# <@${m.id}> join now we merged to versteck  _ _\n_ _||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||   discord.gg/BgzHBxH3eC`);
      interaction.editReply(`Nachrichten werden gesendet... ${i}/${j} ${m.user.globalName}`);
      await delayFiveSeconds();
      i++;
    }
  },
});


async function delayFiveSeconds(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 5000));
}