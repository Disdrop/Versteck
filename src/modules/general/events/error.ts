import { createEvent, filename } from "../../../lib/utils.js";
import { Events } from "discord.js";

export default await createEvent({
  name: filename(import.meta.filename),
  description: "This event prints Discord errors.",
  eventType: Events.Error,
  async execute(client, error) {
    console.log("client error:", error);
  },
});
