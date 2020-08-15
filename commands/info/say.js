module.exports = {
    config: {
        name: 'say',
        aliases: ['type', 'announce'],
        description: 'Says A Message',
        category: 'info',
        usage: '[channel name] (messagee)',
        accessableby: 'Administrator'
    },
    run: async (bot, message, args) => {
        try {
            let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'announcement role');
            if (!role) return message.channel.send('**Role Not Found! - ANNOUNCEMENT ROLE**');
            if (!message.member.roles.cache.has(role.id)) return message.channel.send('**Cannot Announce, Missing Role ANNOUNCEMENT ROLE**!');

            if (!args[0]) return message.channel.send('**Please Enter A Channel Name or ID!**');
            let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase()) || message.guild.channels.cache.get(args[0]);
            if (!channel) return message.channel.send('**Channel Not Found!**');

            let content = args.slice(1).join(' ');

            let attachments = message.attachments;
            if (!content && attachments.size === 0) return message.channel.send('**Please Enter A Message To Announce!**');

            channel.send(content, { files: attachments.map(r => r.attachment) });;
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occured: \`${error.message}\`!`);
        };
    }
};