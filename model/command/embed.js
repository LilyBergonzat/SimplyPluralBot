const { MessageEmbed, Message } = require('discord.js');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

const RGB_REGEX = /(\d{1,3})\D*,\D*(\d{1,3})\D*,\D*(\d{1,3})\D*/u;

class EmbedDialog
{
    /**
     * @param {Message} message
     */
    constructor(message) {
        this.embed = new MessageEmbed();
        this.message = message;
        this.channel = message.channel;
        this.destinationChannel = null;

        this.messageFilter = testedMessage => {
            const byAuthor = testedMessage.author.id === message.author.id;
            const hasContent = testedMessage.cleanContent.trim().length > 0;

            return byAuthor && hasContent;
        }

        this.channelMessageFilter = testedMessage => {
            return this.messageFilter(testedMessage) && testedMessage.mentions.channels.size > 0;
        }

        this.returnFirstOfCollection = collection => collection && collection.size ? collection.first() : null;
        this.awaitOptions = { max: 1, time: 5 * MINUTE, errors: ['time'] };

        /**
         * @param {function} filter
         * @returns {Promise<Message>}
         */
        this.awaitMessage = (filter = this.messageFilter) => {
            return this.channel.awaitMessages(
                filter,
                this.awaitOptions
            ).then(async collection => {
                let message = this.returnFirstOfCollection(collection);

                if (message && message.content.toLowerCase() === 'cancel') {
                    message = null;
                    await this.channel.send('Cancelling embed creation.');
                }

                return message;
            }).catch(async () => {
                await this.channel.send('Time out, cancelling embed creation.');
            });
        };
    }

    async execute() {
        await this.channel.send('#️⃣ In which **channel** would you like this embed to be posted?');
        const channelMessage = await this.awaitMessage(this.channelMessageFilter);

        if (!channelMessage) {
            return null;
        }

        this.destinationChannel = channelMessage.mentions.channels.first();
        await this.channel.send('📰 What do you want the **title** of this embed to be (you can also ping someone so it appears as they are saying what is going to be the description)?');
        const titleMessage = await this.awaitMessage(this.messageFilter);

        if (!titleMessage) {
            return null;
        }

        if (titleMessage.mentions.members.size > 0) {
            const member = titleMessage.mentions.members.first();
            this.embed.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }));
        } else {
            this.embed.setTitle(titleMessage.content);
        }

        await this.channel.send('🎨 What do you want the **colour** of this embed to be?');
        const colourMessage = await this.awaitMessage(this.messageFilter);

        if (!colourMessage) {
            return null;
        }

        if (colourMessage.content.startsWith('#')) {
            this.embed.setColor(parseInt(colourMessage.content.substr(1), 16));
        } else if (colourMessage.content.startsWith('0x')) {
            this.embed.setColor(parseInt(colourMessage.content.substr(2), 16));
        } else if (RGB_REGEX.test(colourMessage.content)) {
            const [, red, green, blue] = colourMessage.content.match(RGB_REGEX);
            this.embed.setColor([parseInt(red), parseInt(green), parseInt(blue)]);
        } else {
            this.embed.setColor(colourMessage.content.toUpperCase().replace(/[^A-Z]+/gu, '_'));
        }

        await this.channel.send('💬 What do you want the **description** (contents) of this embed to be?');
        const descriptionMessage = await this.awaitMessage(this.messageFilter);

        if (!descriptionMessage) {
            return null;
        }

        this.embed.setDescription(descriptionMessage.content);
        await this.destinationChannel.send(this.embed);

        return this.channel.send(`✅ The embed has been posted in ${this.destinationChannel}.`);
    }
}

class Embed
{
    static instance = null;

    constructor() {
        if (Embed.instance !== null) {
            return Embed.instance;
        }

        this.aliases = [];
        this.category = CommandCategory.RESOURCE;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Allows to post an embed';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     */
    async process(message, args) {
        const dialog = new EmbedDialog(message);

        return dialog.execute();
    }
}

module.exports = new Embed();
