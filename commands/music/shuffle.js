module.exports = {
    config: {
        name: 'shuffle',
        aliases: ['shufflequeue'],
        description: 'Shuffles The Current Queue',
        category: 'music',
        usage: ' ',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
        if (!role) return message.channel.send('**Role Not Found - DJ**!');

        const player = bot.music.players.get(message.guild.id);
        if (!player || player.queue.size === 0 || (player.position === 0 && !player.playing)) return message.channel.send('❌ **Nothing Playing In This Server!**');

        if (channel && !message.member.roles.cache.has(role.id)) {
            if (channel.id === player.voiceChannel.id) {
                player.queue.shuffle();
                return message.channel.send('**Shuffled The Queue**');
            } else {
                return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
            };
        } else if (!channel && !message.member.roles.cache.has(role.id)) {
            return message.channel.send('**Please Join A Voice Channel!**');
        } else if ((message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) && player) {
            player.queue.shuffle();
            return message.channel.send('**Shuffled The Queue**');
        };
    }
};
