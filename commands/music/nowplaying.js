const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: 'nowplaying',
        category: "music",
        aliases: ["np"],
        description: 'Now playing command.',
        usage: "Shows current song playing",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        const player = bot.music.players.get(message.guild.id);
        if (!player || player.queue.size === 0 || (player.position === 0 && !player.playing)) return message.channel.send('❌ **Nothing Playing In This Server!**');

        const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
        if (!role) return message.channel.send('**Role Not Found - DJ**');

        try {
            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (player.voiceChannel.id === channel.id) {
                    let video = player.queue[0];
                    let description;
                    if (video.isStream) {
                        description = 'Live Stream';
                    } else {
                        const part = Math.floor((player.position / video.duration) * 30);
                        const positionObj = {
                            seconds: Math.floor((player.position / 1000) % 60),
                            minutes: Math.floor((player.position / (1000 * 60)) % 60),
                            hours: Math.floor((player.position / (1000 * 60 * 60)) % 24)
                        };
                        const totalDurationObj = {
                            seconds: Math.floor((video.duration / 1000) % 60),
                            minutes: Math.floor((video.duration / (1000 * 60)) % 60),
                            hours: Math.floor((video.duration / (1000 * 60 * 60)) % 24)
                        };
                        description = `${'─'.repeat(part) + '⚪' + '─'.repeat(30 - part)}\n\n\`${formatDuration(positionObj)} / ${formatDuration(totalDurationObj)}\``;
                    };
                    const videoEmbed = new MessageEmbed()
                        .setThumbnail(`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`)
                        .setColor('GREEN')
                        .setTitle(video.title)
                        .setDescription(description)
                        .setFooter(message.member.displayName, message.author.displayAvatarURL())
                        .setTimestamp();
                    return message.channel.send({ embed: videoEmbed });
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                let video = player.queue[0];
                let description;
                if (video.isStream) {
                    description = 'Live Stream';
                } else {
                    const part = Math.floor((player.position / video.duration) * 30);
                    const positionObj = {
                        seconds: Math.floor((player.position / 1000) % 60),
                        minutes: Math.floor((player.position / (1000 * 60)) % 60),
                        hours: Math.floor((player.position / (1000 * 60 * 60)) % 24)
                    };
                    const totalDurationObj = {
                        seconds: Math.floor((video.duration / 1000) % 60),
                        minutes: Math.floor((video.duration / (1000 * 60)) % 60),
                        hours: Math.floor((video.duration / (1000 * 60 * 60)) % 24)
                    };
                    description = `${'─'.repeat(part) + '⚪' + '─'.repeat(30 - part)}\n\n\`${formatDuration(positionObj)} / ${formatDuration(totalDurationObj)}\``;
                };
                const videoEmbed = new MessageEmbed()
                    .setThumbnail(`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`)
                    .setColor('GREEN')
                    .setTitle(video.title)
                    .setDescription(description)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL())
                    .setTimestamp();
                return message.channel.send({ embed: videoEmbed });
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};

function formatDuration(durationObj) {
    const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
        }:${
        (durationObj.seconds < 10)
            ? ('0' + durationObj.seconds)
            : (durationObj.seconds
                ? durationObj.seconds
                : '00')
        }`;
    return duration;
};
