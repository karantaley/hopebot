const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { TOKEN } = require('./config');
const bot = new Client();

bot.commands = new Collection();
bot.aliases = new Collection();
bot.games = new Collection();
bot.mongoose = require('./structures/mongoose');
bot.erela = require('./structures/erela');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on('message', async (message) => {
    try {
        if (message.author.bot || message.channel.type === 'dm') return;

        if (message.content.toLowerCase() === 'hello') {
            message.channel.send(`Hi ${message.member}!`);
        } else if (message.content.toLowerCase() === 'hi') {
            message.channel.send(`Hello ${message.member}!`);
        } else if (message.content.toLowerCase().includes('tryout')) {
            message.channel.send('To join HOPE type `+apply` and fill the form in your DM.');
        } else if (message.content.toUpperCase() === 'HOPE') {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`${message.member.guild.name} Was Created On`)
                .setColor('GREEN')
                .setImage('https://cdn.discordapp.com/attachments/724541103008776232/745967858315690085/Hope_Logo.gif')
                .setDescription(message.guild.createdAt)
                .setTimestamp();
            message.channel.send({ embed: embed });
        } else if (message.content.toLowerCase() === 'chutiya') {
            message.channel.send(`${message.member} Gali mat de Madarchod`);
        } else if (message.content.toLowerCase() === 'madarchod') {
            message.channel.send('Chutiye gali mat de');
        } else if (message.content.toLowerCase() === 'chutiye') {
            message.channel.send(`Tu hoga chutiya ${message.member}`);
        } else if (message.mentions.users.has('393819701924462603') && message.content === '<@!393819701924462603>') {
            message.channel.send('KT\'s reply is on the way.');
        } else if (message.mentions.users.has('412605058086207490') && message.content === '<@!412605058086207490>') {
            message.channel.send(`Parsh ka net kharab hai bhai, VC nahi kar sakta`);
        } else if (message.content.toLowerCase() === 'noob' && message.author.id !== '457556815345877003') {
            message.channel.send(`${message.member} Tu ultra pro max noob`);
        } else if (message.content.toLowerCase().includes('inners')) {
            message.channel.send(`Inners Start At 9:30 p.m. Everyday!`)
        };
    } catch (error) {
        return console.error(error);
    };
});

bot.mongoose.init();
bot.login(TOKEN);
