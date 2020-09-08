module.exports = {
    config: {
        name: 'leave',
        aliases: ['dc', 'stop'],
        description: 'Leave A Voice Channel',
        category: 'music',
        usage: ' ',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            const { id } = message.guild;

            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const player = bot.music.players.get(id);
            if (!player) return message.channel.send('❌ **Nothing Playing In This Server!**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (channel) {
                if (player.voiceChannel.id === channel.id) {
                    bot.music.players.destroy(id);
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Has Joined!**');
                };
            } else if (message.member.roles.cache.has(role.id) && message.guild.me.voice.channel) {
                bot.music.players.destroy(id);
            };
            return message.channel.send('**Disconnected From VC!**');
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
