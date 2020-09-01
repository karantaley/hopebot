module.exports = {
    config: {
        name: 'volume',
        aliases: ["vol"],
        category: "music",
        description: 'Shows and changes volume.',
        usage: ', vol [volume] (1-10)',
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const player = bot.music.players.get(message.guild.id);
            if (!player) return message.channel.send('**I Am Not Connected To Any Voice Channel!**');

            if (player.queue.size === 0) return message.channel.send('**Nothing Is Being Played!**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (!args[0]) return message.channel.send(`**The Current Volume is: \`${player.volume / 10}\`**`);
            if (isNaN(args[0])) return message.channel.send(`**Please Enter A Positive Integer!**`);

            if (args[0] < 11 && args[0] > 0) player.setVolume(parseInt(args[0]) * 10);
            else return message.channel.send('**Select Volume From 1-10**');

            return message.channel.send(`**Volume Set To: \`${args[0]}\`**`);
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
