const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'play',
        aliases: ['p'],
        category: 'music',
        description: 'Plays Music In Voice Channel',
        usage: '[song name | song link]',
        accessableby: 'everyone'
    },
    run: async (bot, message, args, ops) => {
        try {
            const searchString = args.join(' ');
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('**Please Join A Voice Channel!**');

            const searchResults = await bot.music.search(searchString , message.author);
            const tracks = searchResults.tracks.slice(0, 1);
            if (tracks.length === 0) return message.channel.send('**❌ No Matches!**');

            let player = bot.music.players.get(message.guild.id);
            if (!player) {
                bot.music.players.spawn(
                    {
                        guild: message.guild.id,
                        voiceChannel: channel,
                        textChannel: message.channel
                    }
                );
                player = bot.music.players.get(message.guild.id);
            };
            const track = tracks[0];
            player.queue.add(track);

            if (!player.playing) return player.play();
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Added To Queue")
                .setThumbnail(`https://i.ytimg.com/vi/${track.identifier}/hqdefault.jpg`)
                .setDescription(`**${track.title}** has been added to queue! | Requested By **${message.author.username}**`)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            return message.channel.send({ embed: sembed });
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
