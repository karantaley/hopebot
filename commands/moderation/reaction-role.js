const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'reaction-role',
        aliases: ['rr', 'rrsetup'],
        usage: ' ',
        accessableby: ' ',
        category: 'moderation',
        description: 'nothing'
    },
    run: async (bot, message, args) => {
        try {
            const embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setTitle('Reaction Roles')
                .setColor('GREEN')
                .setDescription(`__**To get access to specific Gaming channels, react to the games you play.**__\n\n> <:COPS:756130279592296448> : Critical Ops\n> <:Valorant:756130277759254568> : Valorant\n> <:BattlePrime:756130892916850688> : Battle Prime\n> <:AmongUs:756130278870876202> : Among Us`)
                .setFooter('React To Get Roles!')
                .setTimestamp();
            let msg = await message.channel.send({ embed: embed });

            await msg.react('756130279592296448');
            await msg.react('756130277759254568');
            await msg.react('756130892916850688');
            await msg.react('756130278870876202');

            return;
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};