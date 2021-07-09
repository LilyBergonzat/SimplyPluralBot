const Guild = require('../../model/guild');

module.exports = async (member) => {
    Guild.guildMemberAddHandler(member);
};