const Logger = require('@lilywonhalf/pretty-logger');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

class SetAvatar
{
    constructor() {
        this.aliases = ['setavatar'];
        this.category = CommandCategory.BOT_MANAGEMENT;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Set the bot avatar';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        bot.user.setAvatar(args.join(' ')).then(() => {
            message.reply('my avatar has been changed!')
        }).catch((error) => {
            message.reply('there has been an error changing my avatar. Check the logs for more details.');
            Logger.exception(error);
        });
    }
}

module.exports = new SetAvatar();
