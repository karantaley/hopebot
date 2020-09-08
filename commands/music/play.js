const { MessageEmbed } = require('discord.js');
const play = require('../../structures/loadTracks');
const { getData, getPreview } = require('spotify-url-info');

module.exports = {
    config: {
        name: 'play',
        aliases: ['p'],
        category: 'music',
        description: 'Plays Music In Voice Channel',
        usage: '[yt | bc | sc | mix | twitch] (optional) [song name | song link]\n\nEg:-\n+play youtube Imagine Dragons\n+play soundcloud Anything You Want\n+play Imagine Dragons',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('**Please Join A Voice Channel!**');

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

            if (player.voiceChannel.id !== channel.id) return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");

            if (args[0].startsWith('https://open.spotify.com')) {
                const data = await getData(args.join(''));
                if (data.type === 'playlist' || data.type === 'album') {
                    let songsToAdd = data.tracks.items.length;
                    if (data.type == 'playlist') {
                        for (let i = 0; i < songsToAdd; i++) {
                            const song = data.tracks.items[i];
                            play(bot, message, player, `${song.track.name} ${song.track.artists[0].name}`, true);
                        }
                    } else {
                        await data.tracks.items.forEach(song => {
                            play(bot, message, player, `${song.name} ${song.artists[0].name}`, true);
                        });
                    };

                    const playlistInfo = await getPreview(args.join(''));
                    const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setTitle('Playlist Added')
                        .setColor('GREEN')
                        .setURL(args.join(''))
                        .setDescription(`__Playlist__ - **${playlistInfo.title}**\n\nPlaylist Length: **${songsToAdd}**`)
                        .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp();
                    return message.channel.send({ embed: embed });
                } else if (data.type == 'track') {
                    const track = await getPreview(args.join(' '));
                    play(bot, message, player, `${track.title} ${track.artist}`, false);
                };
            } else {
                if (['youtube', 'yt', 'sc', 'soundcloud', 'bc', 'bandcamp', 'mix', 'mixer', 'twitch'].includes(args[0].toLowerCase())) {
                    if (args[0].toLowerCase() === 'yt') args[0] = 'youtube';
                    if (args[0].toLowerCase() === 'sc') args[0] = 'soundcloud';
                    if (args[0].toLowerCase() === 'bc') args[0] = 'bandcamp';
                    if (args[0].toLowerCase() === 'mix') args[0] = 'mixer';
                    
                    searchQuery = {
                        source: args[0],
                        query: args.slice(1).join(' '),
                    };
                } else searchQuery = args.join(' ');
                play(bot, message, player, searchQuery, false);
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
