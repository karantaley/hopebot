module.exports = async (bot, reaction, user) => {
    if (user.bot) return;
    if (reaction.message.id !== '756893536523386990') return;

    let roleName = reaction.emoji.name;
    let role = reaction.message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());
    if (!role) return;
    let member = reaction.message.guild.members.cache.get(user.id);

    if (member.roles.cache.has(role.id)) {
        member.roles.remove(role.id)
    };
};