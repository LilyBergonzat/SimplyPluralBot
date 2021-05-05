const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class FrontHistoryImporting
{
    static instance = null;

    constructor() {
        if (FrontHistoryImporting.instance !== null) {
            return FrontHistoryImporting.instance;
        }

        this.aliases = [
            'fronthistoryimporting',
            'fronthistory-importing',
            'front-historyimporting',
            'fronthistoryimport',
            'fronthistory-import',
            'front-historyimport',
            'front-history',
            'fronthistory',
            'front-importing',
            'frontimporting',
            'front-import',
            'frontimport',
            'fhi',
        ];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about importing the front history from PluralKit.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Front history importing', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'Importing your front history to and from PluralKit is planned in the future, but is currently ' +
            'impossible to give any front entries to or take entries from PluralKit until APIv2 for PluralKit is ' +
            'finished. This feature also takes a lower priority than features unique to Simply Plural.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new FrontHistoryImporting();
