const Command = require('../model/command');

/**
 * @param {Message} message
 */
module.exports = async (message) => {
    const user = message.author;

    if ((message.guild === null || isRightGuild(message.guild.id)) && !user.bot) {
        await Command.parseMessage(message);
    }
};
