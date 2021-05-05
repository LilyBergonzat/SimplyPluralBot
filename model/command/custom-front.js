const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class CustomFront
{
    static instance = null;

    constructor() {
        if (CustomFront.instance !== null) {
            return CustomFront.instance;
        }

        this.aliases = ['custom-fronts', 'customfronts', 'customfront', 'cf'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Explains what "custom front" is.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Custom fronts', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'Custom fronts is a kind of status for fronts, like "blurred", "unknown member", "dissociated", etc... \n' +
            '\n' +
            'You don\'t want those to show up as real members in your system list but you still want to be able to ' +
            'set front as one of them — that\'s where custom fronts kick in.\n' +
            '\n' +
            'They\'re highly customizable (as per popular request) so you can name them anything you want.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new CustomFront();
