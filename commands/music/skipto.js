module.exports = {
    config: {
        name: 'skipto',
        noalias: [''],
        description: 'Skips To A Current Position In Queue',
        category: 'music',
        usage: '[song number]',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            const player = bot.music.players.get(message.guild.id);
            if (!player || !player.playing || player.queue.size === 0) return message.channel.send('❌ **Nothing Playing In This Server!**');

            if (!args[0]) return message.channel.send('**Please Enter The Song Number To Skip!**');
            if (isNaN(args[0]) || args[0] < 1) return message.channel.send('**Please Enter A Positive Integer Number!**');
            if (args[0] > player.queue.size || !player.queue[args[0] - 1]) return message.channel.send('**Song Not Found!**');

            if (args[0] > 1 && player.queue.size !== args[0]) {
                player.queue.splice(0, args[0] - 1);
            } else if (args[0] > 1 && player.queue.size === args[0]) {
                player.queue.length = [];
            };

            message.channel.send(`**Skipped \`${args[0] === 1 ? '1 Song' : `${args[0]} Songs`}\`**`);
            return player.stop();
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
