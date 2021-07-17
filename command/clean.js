const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../config.json');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

class Clean
{
    constructor() {
        this.aliases = ['clear', 'purge'];
        this.category = CommandCategory.MODERATION;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Deletes messages in a bulk.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        if (args.length > 0 && parseInt(args[0]) > 0) {
            await message.channel.bulkDelete(Math.min(parseInt(args[0]) + 1, 100));
        } else {
            message.reply(`You have to tell me how many messages I should clean. \`${Config.prefix}clean 10\` for example.`);
        }
    }
}

module.exports = new Clean();
