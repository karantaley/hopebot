const { MessageEmbed } = require('discord.js');
let USED = false;

module.exports = {
    config: {
        name: 'skip',
        description: 'Skip command.',
        category: "music",
        aliases: ["s"],
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const { id } = message.guild;

            const role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found - DJ**');

            const player = bot.music.players.get(id);
            if (!player) return message.channel.send('**I Am Not Connected To Any Voice Channel!**');

            if (player.queue.size === 0) return message.channel.send('**Nothing Is Being Played!**');

            const { channel } = message.member.voice;
            if (!channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**You Are Not Connected To Any Voice Channel!**');

            if (channel && !message.member.roles.cache.has(role.id) && !message.member.permissions.has('ADMINISTRATOR')) {
                if (player.voiceChannel.id === channel.id) {
                    const members = channel.members.filter(r => !r.user.bot);
                    if (members.size === 1) {
                        player.stop();
                    } else {
                        if (!USED) {
                            USED = true;
                            const votesRequired = Math.ceil(members.size * .6);

                            const embed = new MessageEmbed()
                                .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                .setColor('GREEN')
                                .setDescription(`**Total Votes Required To Skip! - ${votesRequired}**`)
                                .setTimestamp();
                            let msg = await message.channel.send({ embed: embed });
                            await msg.react('⏩');
                            await msg.react('❎');

                            const filter = (reaction, user) => {
                                if (user.bot) return false;
                                const filterChannel = message.guild.members.cache.get(user.id).voice.channel;
                                if (filterChannel) {
                                    if (filterChannel.id === player.voiceChannel.id) {
                                        return ['⏩'].includes(reaction.emoji.name);
                                    };
                                    return false;
                                } else {
                                    return false;
                                };
                            };

                            try {
                                const collector = await msg.awaitReactions(filter, {
                                    max: votesRequired,
                                    time: 60000,
                                    errors: ['time']
                                });
                                const totalVotes = collector.get('⏩').users.cache.filter(u => !u.bot);
                                if (totalVotes.size >= votesRequired) {
                                    player.stop();
                                    USED = false;
                                    return message.channel.send(`**Skipped Song ${player.queue[0].title}**`);
                                } else {
                                    return message.channel.send(`**Could Not Skip The Song, Not Enough Reactions!**`);
                                };
                            } catch (error) {
                                console.error(error);
                                USED = false;
                                return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
                            }
                        } else {
                            return message.channel.send(`**React On The Emoji To Skip!**`);
                        };
                    };
                } else {
                    return message.channel.send('**Please Join The VC In Which The Bot Is Currently Playing Music!**');
                };
            } else if (message.member.roles.cache.has(role.id) || message.member.permissions.has('ADMINISTRATOR')) {
                player.stop();
                return message.channel.send(`**Skipped Song ${player.queue[0].title}**`);
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
