const { PREFIX } = require('../../config');
const queue = new Map();

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === 'dm') return; 

        let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(PREFIX)) return;

        let ops = {
            queue: queue
        };

        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (commandfile) commandfile.run(bot, message, args, ops);

    } catch (err) {
        console.error(err);
    };
};