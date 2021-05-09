const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class Website
{
    static instance = null;

    constructor() {
        if (Website.instance !== null) {
            return Website.instance;
        }

        this.aliases = [];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about the possibility of having a web portal for Simply Plural.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Website', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'A web portal for Simply Plural is unlikely to be made at the moment. The framework that Simply Plural ' +
            'has been created with has the capability of web development, but it is currently experimental, which ' +
            'would make it buggy and unstable to use. This decision may change later in the year when the framework ' +
            'becomes more stable and once the app is more complete.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new Website();
