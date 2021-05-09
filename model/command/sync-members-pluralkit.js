const { MessageEmbed } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class SyncMembersPluralkit
{
    static instance = null;

    constructor() {
        if (SyncMembersPluralkit.instance !== null) {
            return SyncMembersPluralkit.instance;
        }

        this.aliases = [
            'sync-member-pluralkit',
            'syncmemberpluralkit',
            'syncmember-pluralkit',
            'sync-memberpluralkit',
            'syncmemberspluralkit',
            'syncmembers-pluralkit',
            'sync-memberspluralkit',
            'sync-member-plural-kit',
            'syncmemberplural-kit',
            'syncmember-plural-kit',
            'sync-memberplural-kit',
            'syncmembersplural-kit',
            'syncmembers-plural-kit',
            'sync-membersplural-kit',
            'sync-member',
            'syncmember',
            'sync-members',
            'syncmembers',
            'sync-pluralkit',
            'syncpluralkit',
            'sync-plural-kit',
            'syncplural-kit',
            'smp',
            'smpk',
        ];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Talks about syncing your members to PluralKit.';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const embed = new MessageEmbed();

        embed.setColor(APP_MAIN_COLOUR);
        embed.setAuthor('Sync members to PluralKit', bot.user.displayAvatarURL({ dynamic: true }));
        embed.setDescription(
            'If you wish to sync your members to PluralKit, go into the settings page -> Integrations -> PluralKit ' +
            'and fill in your PluralKit token, you can get this token by typing pk;token anywhere and PluralKit ' +
            'will message you the token in a DM. \n' +
            '\n' +
            'Once filled out, you can go to actions in the members page and press Sync (rebooting app may be ' +
            'required to see this option after adding the token). You will be prompted with the option to sync to ' +
            'and from pk. \n' +
            '\n' +
            'Pay attention that they are linked by the plural kit id found in the individual member settings in ' +
            'Simply Plural. If you make a member on Simply Plural and you make the same member on PluralKit you ' +
            'will have to go into the individual member settings of Simply Plural and fill in the PluralKit user id ' +
            'in the settings. If you don\'t do this you will end up with duplicate members on Plural Kit.'
        );

        return message.channel.send(embed);
    }
}

module.exports = new SyncMembersPluralkit();
