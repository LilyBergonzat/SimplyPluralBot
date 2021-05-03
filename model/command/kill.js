const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../../config.json');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class Kill
{
    static instance = null;

    constructor() {
        if (Kill.instance !== null) {
            return Kill.instance;
        }

        this.aliases = [];
        this.category = CommandCategory.BOT_MANAGEMENT;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Kills the bot process';
    }

    /**
     * @param {Message} message
     */
    async process(message) {
        await message.react('✔');
        Logger.notice('killbotpls');
    }
}

module.exports = new Kill();
