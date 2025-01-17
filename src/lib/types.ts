import { ClientEvents } from "discord.js";

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { Client } from "./client.js";

interface NameDescription {
  name: string;
  description: string;
}

export type AnyEvent = {
  [K in keyof ClientEvents]: Event<K>;
}[keyof ClientEvents];

export interface Module<
  CommandTypes extends Record<string, Command>,
  EventTypes extends Record<string, AnyEvent>,
  FunctionTypes extends Record<string, Function<unknown[], unknown>>
> extends NameDescription {
  commands?: CommandTypes;
  events?: EventTypes;
  functions?: FunctionTypes;
  startModule: (client: Client) => void;
}

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (client: Client, interaction: ChatInputCommandInteraction) => void;
}

export interface Event<EventTypeKey extends keyof ClientEvents>
  extends NameDescription {
  eventType: EventTypeKey;
  execute: (client: Client, ...args: ClientEvents[EventTypeKey]) => void;
}

export interface Function<T extends unknown[], R> extends NameDescription {
  execute: (...args: T) => R;
}

export interface Field {
  name: string;
  value: string;
  inline: boolean;
}
