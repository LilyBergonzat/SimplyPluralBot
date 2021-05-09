const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class SeeMembers
{
    static instance = null;

    constructor() {
        if (SeeMembers.instance !== null) {
            return SeeMembers.instance;
        }

        this.aliases = ['see-members', 'seemembers', 'seemember', 'sm'];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Explains how to allow your friends to see your members.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('See members', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'If your friends cannot see your members, you have to go into the friend their profile, click on the ' +
            'cogwheel on the right top and press "They can see your shared members", this will allow them to see ' +
            'your public members'
        );

        return message.channel.send(embed);
    }
}

module.exports = new SeeMembers();
