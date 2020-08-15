const { VoiceState } = require('discord.js');

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
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to stop music!');
            if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");

            let role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found! - DJ**');
            if (!message.member.roles.cache.has(role.id)) return message.channel.send('**Cannot Skip, Missing Role DJ**!');
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send(':x: **Nothing playing in this server**');
            serverQueue.songs.length === 1 ? serverQueue.connection.dispatcher.end() : serverQueue.connection.dispatcher.end();
            await message.channel.send(':fast_forward: Skipped');
            await channel.join();
            return;
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};