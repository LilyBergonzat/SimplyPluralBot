const Command = require('../../model/command');

/**
 * @param {Message} message
 */
module.exports = async (message) => {
    const user = message.author;

    if (!user.bot) {
        await Command.parseMessage(message);
    }
};
