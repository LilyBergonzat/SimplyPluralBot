const Guild = require('../../model/guild');

module.exports = async (member) => {
    if ((member.guild === null || isRightGuild(member.guild.id)) && !member.user.bot) {
        Guild.guildMemberAddHandler(member);
    }
};