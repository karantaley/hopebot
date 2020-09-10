const { Utils } = require("erela.js");

module.exports = {
    config: {
        name: 'seek',
        aliases: ['seekto'],
        category: 'music',
        description: 'Seeks To The Given Timestamp Of The Song',
        usage: '[timestamp]',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0 || (player.position === 0 && !player.playing)) return message.channel.send('❌ **Nothing Playing In This Server!**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (player.voiceChannel.id === channel.id) {
                    let timestampInMS = Utils.parseTime(args.join(''));

                    if (timestampInMS === null) return message.channel.send(`**Please Enter Time In This Format!\n\n\`\`\`css\n1s, 1m, 1h, 1d, 1w, 1month, 1y\`\`\`**`);
                    if (timestampInMS > player.queue[0].duration || timestampInMS < 0) return message.channel.send('**Cannot Seek Beyond Length Of Song!\nPlease Enter Time In This Format!\n\n\`\`\`css\n1s, 1m, 1h, 1d, 1w, 1month, 1y\`\`\`**');

                    player.seek(timestampInMS);
                    return message.channel.send('**▶️ Seeked!**');
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                let timestampInMS = Utils.parseTime(args.join(''));

                if (timestampInMS === null) return message.channel.send(`**Please Enter Time In This Format!\n\n\`\`\`css\n1s, 1m, 1h, 1d, 1w, 1month, 1y\`\`\`**`);
                if (timestampInMS > player.queue[0].duration || timestampInMS < 0) return message.channel.send('**Cannot Seek Beyond Length Of Song!\nPlease Enter Time In This Format!\n\n\`\`\`css\n1s, 1m, 1h, 1d, 1w, 1month, 1y\`\`\`**');

                player.seek(timestampInMS);
                return message.channel.send('**▶️ Seeked!**');
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
