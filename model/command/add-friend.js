const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class AddFriend
{
    static instance = null;

    constructor() {
        if (AddFriend.instance !== null) {
            return AddFriend.instance;
        }

        this.aliases = ['add-friends', 'addfriends', 'addfriend', 'af'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Explains how to troubleshoot not being able to add a friend.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Add friend', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'If you and your friends are unable to add each other as friends, or can\'t find each other as friends, ' +
            'make sure that you are using a case sensitive username when adding each other. Additionally, it is ' +
            'currently not possible to add people by their user ID, so if you are using a user id to add them as ' +
            'friend this currently does not work but will in the future.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new AddFriend();
