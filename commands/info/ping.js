const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays bot ping",
        usage: " ",
        noalias: "No Aliases",
        category: "info",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        try {
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`💓 ${Math.round(bot.ws.ping)}`)
            await message.channel.send({ embed: embed });
        } catch (error) {
            return console.error(error);
        };
    }
};