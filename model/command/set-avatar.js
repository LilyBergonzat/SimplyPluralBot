const Logger = require('@lilywonhalf/pretty-logger');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class SetAvatar
{
    static instance = null;

    constructor() {
        if (SetAvatar.instance !== null) {
            return SetAvatar.instance;
        }

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
