const filter = require("../../structures/filter");
const setFilter = require("../../structures/utils/setFilter");

module.exports = {
    config: {
        name: 'bass',
        noalias: [''],
        category: 'music',
        description: 'Turns On Or Off Bass Filter',
        usage: '',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            let breaked = false;
            const player = bot.music.players.get(message.guild.id);
            if (!player || player.queue.size === 0 || !player.playing) return message.channel.send('**❌ Nothing Playing In This Server!**');

            const { channel } = message.member.voice;
            if (!channel) return message.channel.send(`**❌ You Are Not Connected To Any Voice Channel!**`);

            for (let i = 0; i < player.bands.length; i++) {
                if (player.bands[i].gain === filter.bass[i].gain) 
                    breaked = true
                    break;
            };

            if (breaked) {
                setFilter(bot, message, 'bass', false);
            } else setFilter(bot, message, 'bass', true);
            return;
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};