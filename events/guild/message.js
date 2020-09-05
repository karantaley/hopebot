const { PREFIX } = require('../../config');

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === 'dm') return; 

        let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(PREFIX)) return;

        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (commandfile) commandfile.run(bot, message, args);

    } catch (err) {
        console.error(err);
    };
};
