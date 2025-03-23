import { buildEmbed, createEmbed } from "../../../lib/utils.js";

export default await buildEmbed(async (UserID: string) => {
  return [
    await createEmbed({
      title: "Pong",
      description: `<@${UserID}> du hast den Bot gepingt und er schießt Pong zurück!`,
    }),
  ];
});
