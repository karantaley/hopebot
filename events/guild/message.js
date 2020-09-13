const { PREFIX } = require('../../config');
const AFKList = require('../../structures/models/AFKList');

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === 'dm') return; 

        let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (message.content.includes(message.mentions.members.first())) {
            let mentioned = await AFKList.findOne({
                ID: message.mentions.members.first().id
            });
            if (mentioned) message.channel.send(`**${mentioned.name} Is Currently AFK\nReason - ${mentioned.reason}!**`);
        };

        let afkcheck = await AFKList.findOne({
            ID: message.author.id
        });
        if (afkcheck) {
            await AFKList.deleteOne({
                ID: message.author.id
            });
            
            message.channel.send(`**${message.author}, I Have Removed Your AFK Now!**`)
        };

        if (!message.content.startsWith(PREFIX)) return;

        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (commandfile) commandfile.run(bot, message, args);

    } catch (err) {
        console.error(err);
    };
};
