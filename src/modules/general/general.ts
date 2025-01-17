import { createModule, filename } from "../../lib/utils.js";

// Commands
import ping from "./commands/ping.js";
import bliblablub from "./commands/bliblablub.js";

// Events
import error from "./events/error.js";
import ready from "./events/ready.js";
import commandHandler from "./events/commandHandler.js";
import { Client } from "../../lib/client.js";

export default await createModule({
  name: filename(import.meta.url),
  description:
    'The "General" module contains basic commands for general information and assistance.',
  commands: {
    ping,
    bliblablub,
  },
  events: {
    error,
    ready,
    commandHandler,
  },
  startModule(client: Client) {
    console.log(`${this.name} has started!`);
  },
});
