import { Client as Discord, GatewayIntentBits as GIB } from "discord.js";
import { config as dotenv } from "dotenv";
import modules from "../modules/modules.js";
import { loadEvents, registerCommands } from "./utils.js";

export class Client extends Discord {
  modules = modules;

  constructor() {
    // Runtime error handeling
    process.on("unhandledRejection", (error) => {
      console.log("Unhandled promise rejection:", error);
    });

    // Super Call & Intents
    super({
      intents: [
        GIB.Guilds,
        GIB.GuildMembers,
        GIB.GuildMessages,
        GIB.GuildVoiceStates,
        GIB.DirectMessages
      ],
    });

    // Load .env file
    dotenv();
  }

  async start() {
    // register commands
    await registerCommands(this);

    // load Events
    await loadEvents(this);

    // Login
    super.login(process.env.TOKEN).then(() => {
      console.log(`[Discord] Eingeloggt als ${this.user!.tag}.`);
    });
  }
}
