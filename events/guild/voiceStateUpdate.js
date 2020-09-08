module.exports = async (bot, oldVoice, newVoice) => {
    try {
        const player = bot.music.players.get(oldVoice.guild.id);
        if (!player) return;

        if (!newVoice.guild.members.cache.get(bot.user.id).voice.channelID) bot.music.players.destroy(newVoice.guild.id);
        return;
    } catch (error) {
        console.error(error);
    };
};
