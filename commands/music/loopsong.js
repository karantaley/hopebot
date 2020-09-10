module.exports = {
    config: {
        name: 'loopsong',
        aliases: ["ls"],
        category: "music",
        description: 'Repeats The Current Song',
        usage: " ",
        accessableby: "everyone"module.exports = {
    config: {
        name: 'loopsong',
        aliases: ["ls"],
        category: "music",
        description: 'Repeats The Current Song',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0 || (player.position === 0 && !player.playing)) return message.channel.send('❌ **Nothing Playing In This Server!**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (player.voiceChannel.id === channel.id) {
                    if (!player.trackRepeat) {
                        player.setTrackRepeat(true);
                        return message.channel.send('**🔁 Song Has Been Looped!**');
                    } else {
                        player.setTrackRepeat(false);
                        return message.channel.send('**🔁 Song Has Been Unlooped!**');
                    };
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                if (!player.trackRepeat) {
                    player.setTrackRepeat(true);
                    return message.channel.send('**🔁 Song Has Been Looped!**');
                } else {
                    player.setTrackRepeat(false);
                    return message.channel.send('**🔁 Song Has Been Unlooped!**');
                };
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
    },
    run: async (bot, message, args, ops) => {
        try {
            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0) return message.channel.send('❌ **Nothing playing in this server**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (player.voiceChannel.id === channel.id) {
                    if (!player.trackRepeat) {
                        player.setTrackRepeat(true);
                        return message.channel.send('**🔁 Song Has Been Looped!**');
                    } else {
                        player.setTrackRepeat(false);
                        return message.channel.send('**🔁 Song Has Been Unlooped!**');
                    };
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                if (!player.trackRepeat) {
                    player.setTrackRepeat(true);
                    return message.channel.send('**🔁 Song Has Been Looped!**');
                } else {
                    player.setTrackRepeat(false);
                    return message.channel.send('**🔁 Song Has Been Unlooped!**');
                };
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
