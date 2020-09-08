module.exports = {
    config: {
        name: 'remove',
        aliases: ['removesong'],
        category: 'music',
        description: 'Removes Song From Queue',
        usage: '[fromSongNo., TillSongNo.] (optional)',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0) return message.channel.send('❌ **Nothing Playing In This Server!**');

            if (isNaN(args[0]) || args[0] < 1) return message.channel.send('**Please Enter A Positive Integer!**');

            if (args[1]) {
                if (args[0] - 1 === 0 || args[1] - 1 === 0) return message.channel.send(`**Cannot Remove A Song That Is Already Being Played!**`);

                if (args[0] > player.queue.size || args[1] > player.queue.size) return message.channel.send('**Song Not Found!**');
                if (args[0] > args[1]) return message.channel.send('**First Number Should Be Less Than Second Number!**');

                const songsToRemove = args[1] - args[0];
                player.queue.splice(args[0] - 1, songsToRemove + 1);
                return message.channel.send(`**Removed \`${songsToRemove + 1}\` Songs From The Queue!**`);
            } else {
                if (args[0] - 1 === 0) return message.channel.send(`**Cannot Remove A Song That Is Already Being Played!**`);
                if (args[0] > player.queue.size) return message.channel.send('**Song Not Found!**');

                const { title } = player.queue[args[0] - 1];

                player.queue.splice(args[0] - 1, 1);
                return message.channel.send(`**Removed \`${title}\` From The Queue!**`);
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
