module.exports = {
    config: {
        name: 'clear',
        aliases: ['clearall'],
        category: "music",
        description: 'Skips all songs in queue',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            let role = message.guild.roles.cache.find(r => r.name.toUpperCase() === 'DJ');
            if (!role) return message.channel.send('**Role Not Found! - DJ**');
            if (!message.member.roles.cache.has(role.id)) return message.channel.send('**Cannot Skip, Missing Role DJ**!');
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to skip music!');
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
            }
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send(':x: **Nothing playing in this server**');
            if (!serverQueue.songs) return message.channel.send(':x: **There are No Songs In The Queue!**')
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            await message.channel.send("Skipped All Songs");
            return await channel.join();
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
