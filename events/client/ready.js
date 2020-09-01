module.exports = bot => {
    console.log(`${bot.user.username} is available now!`);
    bot.user.setActivity(`${bot.users.cache.size} users!`, {
        type: "WATCHING"
    });
    bot.erela.nodeConnect(bot);
};
