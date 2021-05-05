const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class SystemRelationships
{
    static instance = null;

    constructor() {
        if (SystemRelationships.instance !== null) {
            return SystemRelationships.instance;
        }

        this.aliases = ['system-relationship', 'systemrelationships', 'systemrelationships', 'sr'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Explains what "system relationships" are.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('System relationships', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'This is an open-ended field meant to describe what relationships a headmate has. It can be used to ' +
            'describe the member\'s relationship to the system as a whole, their inner system relationships such as ' +
            'being family, friends, or romantic partners, or it can describe their outer-system relationships with ' +
            'people in the outer world, such as family, friends, and romantic partners.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new SystemRelationships();
