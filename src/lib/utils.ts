import { basename } from "path";
import { Client } from "./client.js";
import {
  APIEmbed,
  ClientEvents,
  Collection,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { AnyEvent, Command, Event, Function, Module } from "./types.js";

export function filename(path: string): string {
  return basename(path).split(".")[0];
}

export async function registerCommands(client: Client) {
  try {
    // Providing commands data for registration
    let commandsData = await getModuleData(
      client,
      ModuleDataOptions.commandsData
    );

    if (commandsData.length === 0)
      return console.log("[Discord] There are no slash commands for reloading");

    // Registration
    const rest = new REST().setToken(process.env.TOKEN as string);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_ID as string,
        process.env.SERVER_ID as string
      ),
      {
        body: commandsData,
      }
    );
    console.log(`[Discord] Reloaded ${commandsData.length} slashcommands.`);
  } catch (error) {
    console.error(error);
  }
}

export async function loadEvents(client: Client) {
  let events = await getModuleData(client, ModuleDataOptions.eventsCollection);
  events.forEach((event) => {
    client.on(
      event.eventType as keyof ClientEvents,
      (...args: ClientEvents[typeof event.eventType]) => {
        // @ts-expect-error
        event.execute(client, ...args);
      }
    );
    console.log(`[Discord] '${event.name}' Event wurde geladen.`);
  });
}

export async function createModule<
  C extends Record<string, Command> = {},
  E extends Record<string, AnyEvent> = {},
  F extends Record<string, Function<unknown[], unknown>> = {}
>(module: Module<C, E, F>): Promise<Module<C, E, F>> {
  return module;
}

export async function createCommand<C extends Command = Command>(
  command: C
): Promise<C> {
  return command;
}

export async function createEvent<K extends keyof ClientEvents>(
  event: Event<K>
): Promise<Event<K>> {
  return event;
}

export async function createFunction<
  T extends unknown[],
  R,
  F extends Function<T, R>
>(func: F): Promise<F> {
  return func;
}

export async function createEmbed(embed: APIEmbed): Promise<APIEmbed> {
  return embed;
}

type Exact<T, U extends T> = T extends U ? (U extends T ? U : never) : never;

// Version 1
/*export async function buildEmbed<Fn extends (...args: unknown[]) => APIEmbed>(
  fn: Fn
): Promise<Fn> {
  return fn;
}*/

// VErsion 2
/*export async function buildEmbed<Fn extends (...args: any[]) => APIEmbed[]>(
  fn: Fn & ((...args: Parameters<Fn>) => Exact<APIEmbed[], ReturnType<Fn>>)
): Promise<Fn> {
  return fn;
}*/

export async function buildEmbed<
  Fn extends (...args: any[]) => Promise<APIEmbed[]>
>(
  fn: Fn &
    ((...args: Parameters<Fn>) => Exact<Promise<APIEmbed[]>, ReturnType<Fn>>)
): Promise<Fn> {
  return fn;
}

export enum ModuleDataOptions {
  commandsData = "commandsData",
  commandsCollection = "commandsCollection",
  eventsCollection = "eventsCollection",
}

type DataModuleType = {
  [ModuleDataOptions.commandsData]: RESTPostAPIChatInputApplicationCommandsJSONBody[];
  [ModuleDataOptions.commandsCollection]: Collection<string, Command>;
  [ModuleDataOptions.eventsCollection]: Collection<string, AnyEvent>;
};

export async function getModuleData<T extends ModuleDataOptions>(
  client: Client,
  returnType: T
): Promise<DataModuleType[T]> {
  // Create one object (`data`) that holds all possible data types.
  const data: DataModuleType = {
    [ModuleDataOptions.commandsData]:
      [] as RESTPostAPIChatInputApplicationCommandsJSONBody[],
    [ModuleDataOptions.commandsCollection]: new Collection<string, Command>(),
    [ModuleDataOptions.eventsCollection]: new Collection<string, AnyEvent>(),
  };

  // Helper function to process objects
  async function processModuleItems<TItem>(
    items: Record<string, TItem> | undefined,
    processor: (itemName: string, item: TItem) => void
  ) {
    if (!items) return;
    for (const itemName in items) {
      if (Object.prototype.hasOwnProperty.call(items, itemName)) {
        processor(itemName, items[itemName]);
      }
    }
  }

  // Iterate over modules
  for (const moduleName in client.modules) {
    if (Object.prototype.hasOwnProperty.call(client.modules, moduleName)) {
      const module = client.modules[moduleName];

      // Process commands
      await processModuleItems(module.commands, async (_, command) => {
        const typedCommand = command as Command;
        (
          data[
            ModuleDataOptions.commandsData
          ] as RESTPostAPIChatInputApplicationCommandsJSONBody[]
        ).push(typedCommand.data.toJSON());
        (
          data[ModuleDataOptions.commandsCollection] as Collection<
            string,
            Command
          >
        ).set(typedCommand.data.name, typedCommand);
      });

      // Process events
      await processModuleItems(module.events, async (_, event) => {
        const typedEvent = event as AnyEvent;
        (
          data[ModuleDataOptions.eventsCollection] as Collection<
            string,
            AnyEvent
          >
        ).set(typedEvent.name, typedEvent);
      });
    }
  }

  // Return only the data for the single requested option
  return data[returnType];
}
