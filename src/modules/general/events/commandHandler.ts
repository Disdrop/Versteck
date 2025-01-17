import {
  createEvent,
  filename,
  getModuleData,
  ModuleDataOptions,
} from "../../../lib/utils.js";
import { Events } from "discord.js";

export default await createEvent({
  name: filename(import.meta.filename),
  description: "This event handels all Commands.",
  eventType: Events.InteractionCreate,
  async execute(client, interaction) {
    // Testing if this interaction is a slashcommand interaction
    if (!interaction.isChatInputCommand()) return;

    // Getting the command
    const commands = await getModuleData(
      client,
      ModuleDataOptions.commandsCollection
    );
    const command = commands.get(interaction.commandName);
    if (!command) return;

    // Execute the command
    try {
      command.execute(client, interaction);
    } catch (error) {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
});
