const Logger = require('@lilywonhalf/pretty-logger');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

class Reload
{
    constructor() {
        this.aliases = ['reboot'];
        this.category = CommandCategory.BOT_MANAGEMENT;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Reboots the bot';
    }

    /**
     * @param {Message} message
     */
    async process(message) {
        await message.reply(`OK, I'm rebooting now.`);
        Logger.notice('Reboot asked');
    }
}

module.exports = new Reload();
