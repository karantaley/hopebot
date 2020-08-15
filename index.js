const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { TOKEN } = require('./config');
const bot = new Client({
    disableMentions: 'everyone',
});

bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

const express = require("express");
const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/dreams", (request, response) => {
  response.json(dreams);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

bot.on('voiceStateUpdate', async (oldState, newState) => {
    newState.setSelfDeaf(true);
});

bot.login(TOKEN);