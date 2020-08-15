module.exports = {
    config: {
        name: "purge",
        aliases: ["delete", "clear"],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "delete [amount of messages]",
        accessableby: "Administrator"
    },
    run: async (bot, message, args) => {
        try {
            let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'manage messages');
            if (!role) return message.channel.send('**Role Not Found - MANAGE MESSAGES**');
            if (!message.member.roles.cache.has(role.id)) return message.channel.send('**You Do Not Have Role - MANAGE MESSAGES**!');
          
            if (isNaN(args[0]))
                return message.channel.send('**Please Enter A Valid Amount To Delete Messages**');

            if (args[0] > 100)
                return message.channel.send("**Please Enter A Number Less Than 100**");

            if (args[0] < 1)
                return message.channel.send("**Please Enter A Number More Than 1**");

            message.channel.bulkDelete(parseInt(args[0]) + 1).then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${parseInt(args[0]) + 1}\` messages**`).then(msg => msg.delete({ timeout: 2000 }))).catch(() => null);
        } catch (error) {
            return message.channel.send("**You Can Only Delete Messages That Are Under 14 Years Old!**")
        };
    }
};