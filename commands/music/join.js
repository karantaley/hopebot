module.exports = {
    config: {
        name: 'join',
        aliases: ['connect'],
        description: 'Joins A Voice Channel',
        category: 'music',
        usage: ' ',
        accessableby: 'everyone'
    },
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('**Please Join A Voice Channel!**');
        const player = bot.music.players.get(message.guild.id);
        if (player) return message.channel.send(`**Already Connected To ${player.voiceChannel.name}!**`);
        bot.music.players.spawn(
            {
                guild: message.guild.id,
                voiceChannel: channel,
                textChannel: message.channel,
                selfDeaf: true
            }
        );
        return message.channel.send('**Joined VC!**');
    }
};
