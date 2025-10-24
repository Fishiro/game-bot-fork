const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
   const folderPath = path.join(__dirname, "..", "commands");
   const commandFolders = fs.readdirSync(folderPath);

   for (const folder of commandFolders) {
      const commandsPath = path.join(folderPath, folder);
      const commandFiles = fs
         .readdirSync(commandsPath)
         .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
         const filePath = path.join(commandsPath, file);
         const command = require(filePath);

         // Tải lệnh vào client.commands
         if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
         } else {
            console.warn(
               `[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`
            );
         }
      }
   }
};
