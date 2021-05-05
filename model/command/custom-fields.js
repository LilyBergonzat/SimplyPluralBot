const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class CustomFields
{
    static instance = null;

    constructor() {
        if (CustomFields.instance !== null) {
            return CustomFields.instance;
        }

        this.aliases = ['custom-fields', 'customfields', 'customfield', 'cfi'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about the "custom fields" feature.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Custom fields', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'The ability to change the fields shown on your member lists is planned. This feature will also bring ' +
            'the ability to remove and add fields, as well as make fields private, public, or show them to only ' +
            'trusted friends.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new CustomFields();
