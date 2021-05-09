const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class AddSetFront
{
    static instance = null;

    constructor() {
        if (AddSetFront.instance !== null) {
            return AddSetFront.instance;
        }

        this.aliases = [
            'addsetfront',
            'addset-front',
            'add-setfront',
            'add-set',
            'addset',
            'add-front',
            'addfront',
            'set-front',
            'setfront',
            'asf',
        ];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about how to set who is fronting in the application.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Add / set front', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'There are two ways in-app to show a member as fronting. Set as front, and add to front.\n' +
            '\n' +
            'Using set as front will clear all members from your front list, and then add that member. Add to front ' +
            'won\'t remove anyone from the list, but it will add the member whose add icon you tapped. You can ' +
            'individually remove members by tapping the downward facing arrow next to their name.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new AddSetFront();
