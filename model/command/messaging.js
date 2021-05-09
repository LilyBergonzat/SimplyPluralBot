const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class Messaging
{
    static instance = null;

    constructor() {
        if (Messaging.instance !== null) {
            return Messaging.instance;
        }

        this.aliases = [];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about the possibility of having a messaging feature.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Messaging', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'The feature of messaging other systems within the app is out of scope, the app is not meant to be a ' +
            'social community app but a tool for you and your friends. Adding messages between systems would need ' +
            'us to implement moderation tools, moderation team and the actual feature, which is not the direction ' +
            'we are taking the app in right now.\n' +
            '\n' +
            'Messaging within the system, between headmates, is planned for the future so you can communicate more ' +
            'easily within the system.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new Messaging();
