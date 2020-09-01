module.exports = {
    config: {
        name: 'pause',
        noalias: 'No Aliases',
        category: "music",
        description: 'Pause command.',
        usage: " ",
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

            if (player.playing) {
                player.pause(true);
                return message.channel.send('**Paused** ⏸');
            } else {
                return message.channel.send(`**Song Already Paused!**`);
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
