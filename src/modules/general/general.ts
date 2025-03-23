import { createModule, filename } from "../../lib/utils.js";

// Commands
import sendmessagetoallusers from "./commands/sendmessagetoallusers.js";

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
    sendmessagetoallusers,
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
