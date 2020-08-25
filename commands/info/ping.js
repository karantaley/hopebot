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
            let msg = await message.channel.send(`Pinging..`);
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:hourglass_flowing_sand: ${msg.createdTimestamp - message.createdTimestamp}\n💓 ${Math.round(bot.ws.ping)}`)
            await msg.edit(``, { embed: embed })
        } catch (error) {
            return console.error(error);
        };
    }
};
