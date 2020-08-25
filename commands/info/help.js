const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { PREFIX } = require('../../config');

module.exports = {
    config: {
        name: "help",
        aliases: ["h"],
        usage: "[command name](optional)",
        category: "info",
        description: "Displays all commands that the bot has.",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        try {
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
                .setThumbnail(bot.user.displayAvatarURL())

            if (!args[0]) {
                const categories = readdirSync("./commands/")

                embed.setDescription(`**These Are the Available Commands For ${message.guild.me.displayName}\nBot's Prefix Is \`${PREFIX}\`\n\nFor Help Related To A Particular Command Type -\n\`${PREFIX}help [command name | alias]\`**`)
                embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${bot.commands.size - 1}`, bot.user.displayAvatarURL());

                categories.forEach(category => {
                    const dir = bot.commands.filter(c => c.config.category === category)
                    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                    try {
                        embed.addField(` ${capitalise} [${dir.size}] - `, dir.map(c => `\`${c.config.name}\``).join(", "))
                    } catch (error) {
                        console.error(error);
                        return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
                    };
                });

                return message.channel.send(embed)
            } else {
                let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${PREFIX}help\` For the List Of the Commands!**`))
                command = command.config

                embed.setDescription(`**The Bot's Prefix Is \`${PREFIX}\`**\n
** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
** Description -** ${command.description || "No Description provided."}\n
** Category -** ${command.category}\n
** Usage -** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No Usage"}\n
** Accessible by -** ${command.accessableby || "everyone"}\n
** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
                embed.setFooter(message.guild.name, message.guild.iconURL())

                return await message.channel.send({ embed: embed });
            };
        } catch (error) {
            console.error(error);
            return message.channel.send(`An Error Occurred: \`${error.message}\`!`);
        };
    }
};
