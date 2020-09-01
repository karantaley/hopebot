const { ErelaClient, Utils } = require('erela.js');
const { ERELA_OPTIONS } = require('../config');
const { MessageEmbed } = require('discord.js');

module.exports = {
    nodeConnect: (bot) => {
        bot.music = new ErelaClient(bot, [
            {
                host: ERELA_OPTIONS.host,
                port: ERELA_OPTIONS.port,
                password: ERELA_OPTIONS.password
            }
        ]);

        bot.music.on('nodeConnect', () => console.log('Node Connected'));
        bot.music.on('nodeError', (node, error) => console.log(`Node Error: ${error.message} on node ${node[0]}`));
        bot.music.on("trackStart", (player, track) => {
            const user = bot.users.cache.get(track.requester.id);
            const embed = new MessageEmbed()
                .setAuthor(track.requester.username, user.displayAvatarURL({ dynamic: true }))
                .setTitle('Now Playing')
                .setColor('GREEN')
                .setThumbnail(`https://i.ytimg.com/vi/${track.identifier}/hqdefault.jpg`)
                .setDescription(`:musical_note: ${track.title} :musical_note:\n\nSong Length: **${Utils.formatTime(track.duration, true)}**`)
                .setTimestamp();
            player.textChannel.send({ embed: embed });
        });
        bot.music.on("queueEnd", player => {
            player.textChannel.send("Queue has ended.")
            bot.music.players.destroy(player.guild.id);
        });
    }
};
