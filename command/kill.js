const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../config.json');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

class Kill
{
    constructor() {
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
