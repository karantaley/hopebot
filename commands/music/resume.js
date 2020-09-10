module.exports = {
    config: {
        name: 'resume',
        aliases: ["res"],
        category: "music",
        description: 'resumes music',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0 || player.position === 0) return message.channel.send('❌ **Nothing Playing In This Server!**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (!player.playing) {
                player.pause(false);
                return message.channel.send('▶️ **Resumed**');
            };
            return message.channel.send('**Song Is Not Paused!**');
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
