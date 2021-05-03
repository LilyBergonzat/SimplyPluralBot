const Config = require('../config.json');
const Guild = require('./guild');

const CommandPermission = {
    /**
     * @param {Message} message
     * @returns {Promise.<boolean>}
     */
    isMommy: async (message) => {
        const member = await Guild.getMemberFromMessage(message);

        return member.id === Config.mom;
    },

    /**
     * @param {Message} message
     * @returns {Promise.<boolean>}
     */
    isMemberMod: async (message) => {
        const member = await Guild.getMemberFromMessage(message);

        return member.id === Config.mom || await Guild.isMemberMod(member);
    },

    /**
     * @param {Message} message
     * @returns {Promise.<boolean>}
     */
    yes: async (message) => {
        return true;
    }
};

module.exports = CommandPermission;
