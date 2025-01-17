# Ayumi Bot

**Ayumi** is a Discord bot written in TypeScript with a module-driven framework that allows developers to quickly add modules, commands, events, functions, and messages.

## Usage

1. Install [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) on the system where the bot will run.
2. Open your terminal.
3. Verify installations by running:

   - `node -v`
   - `npm -v`
   - `git -v`

   _(Bot was tested with Node.js `v22.13.0`, npm `10.9.2` & Git `version 2.47.1.windows.2`)_

4. Navigate to your desired directory:
   ```
   cd C:/Your/Custom/Path
   ```
5. Clone the Ayumi Bot repository:
   ```
   git clone https://github.com/exdnaa/Ayumi.git
   ```
6. Enter the repository folder:
   ```
   cd ./Ayumi
   ```
7. Install dependencies:
   ```
   npm install
   ```
8. Create a `.env` file and add the following, replacing placeholders with your data:
   ```
   TOKEN="YOUR_BOT_TOKEN"
   BOT_ID="YOUR_BOT_ID"
   SERVER_ID="YOUR_SERVER_ID"
   EMPTY_IMG_URL="https://iili.io/JiC00TF.png"
   DATABASE="file:./data.db"
   ```
9. Start the bot:
   ```
   npm run start
   ```

## Checklist

- **General**
  - [ ] Research Config implementation
  - [ ] createFunction Muss noch getestet werden
  - [ ] subcommand Type & createSubcommand Funktion & Groups
  - [ ] Research Bot Message Interface framework
- **Database**
  - [ ] Prisma schema
  - [ ] Prisma integration
  - [ ] Load start data
- **Modules**
  - **General**
    - Commands
      - [ ] help
      - [ ] ping
      - [ ] reload
      - [ ] config module anable
      - [ ] config module disable {moduleName}
      - [ ] info server
      - [ ] info user {user?}
    - **Events**
  - **Welcome**
    - **Commands**
      - [ ] welcomeChannel set {channel}
      - [ ] JoinChannel set {channel}
    - **Events**
      - [ ] MemberJoin
      - [ ] MemberLeave
