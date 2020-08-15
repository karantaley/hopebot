module.exports = {
    config: {
        name: 'disconnect',
        aliases: ['dc', 'stop'],
        category: "music",
        description: "stops the music playing",
        usage: ' ',
        acessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to stop music!');
            if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
            const serverQueue = ops.queue.get(message.guild.id);
            if (serverQueue) {
                serverQueue.songs = [];
                serverQueue.loop = false;
                serverQueue.connection.dispatcher.end();
                await message.guild.me.voice.channel.leave();
            } else {
                await channel.leave();
            }
            return message.channel.send('👋 **Disconnected**');
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};