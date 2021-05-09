const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class Notifications
{
    static instance = null;

    constructor() {
        if (Notifications.instance !== null) {
            return Notifications.instance;
        }

        this.aliases = ['notification'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Explains how your friends can get notifications from your system.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Notifications', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'If your friends are not getting notifications, make sure that you go into the settings of the friend ' +
            'by going on their profile and clicking the cog wheel on the right top. Press "They can get ' +
            'notifications". As a second step your friend(s) have to opt-in to get notifications from you, they ' +
            'have to go to your profile in their friends and click "Get notifications if they change front".'
        );

        return message.channel.send(embed);
    }
}

module.exports = new Notifications();
