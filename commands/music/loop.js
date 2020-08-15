module.exports = {
    config: {
        name: 'loop',
        aliases: ["repeat", "loopqueue"],
        category: "music",
        description: 'Repeats all songs in the queue',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to loop music!');
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
            }
            if (!serverQueue.loop) {
                serverQueue.loop = true;
                return message.channel.send(':repeat: The queue repeat has been enabled.');
            } else {
                serverQueue.loop = false;
                return message.channel.send(':repeat: The queue repeat has been disabled.');
            }
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
