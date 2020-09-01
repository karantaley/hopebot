module.exports = {
    config: {
        name: 'clearqueue',
        aliases: ['clearall'],
        category: "music",
        description: 'Skips all songs in queue',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            const serverQueue = bot.music.players.get(message.guild.id);
            if (!serverQueue || serverQueue.queue.size === 0) return message.channel.send('❌ **Nothing Playing In This Server!**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (serverQueue.voiceChannel.id === channel.id) {
                    serverQueue.queue.length = [];
                    return message.channel.send("✅ **Skipped All Songs!**");
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                serverQueue.stop();
                serverQueue.queue.length = [];
                serverQueue.playing = false;
                return message.channel.send("✅ **Skipped All Songs!**");
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
