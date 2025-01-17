import { SlashCommandBuilder } from "discord.js";
import { createCommand, filename } from "../../../lib/utils.js";
import pong from "../messages/pong.js";

export default await createCommand({
  data: new SlashCommandBuilder()
    .setName(filename(import.meta.url))
    .setDescription("Replies with Pong"),
  async execute(client, interaction) {
    await interaction.reply({ embeds: await pong(interaction.user.id) });
  },
});
