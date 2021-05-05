const Discord = require('discord.js');
const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../../config.json');
const EmojiCharacters = require('../../emoji-characters.json');
const Guild = require('../guild');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

const cachelessRequire = (path) => {
    if (typeof path === 'string') {
        delete require.cache[require.resolve(path)];
    }

    return typeof path === 'string' ? require(path) : null;
};

class HelpDialog
{
    /**
     * @param {Message} message
     */
    constructor(message) {
        this.categoriesMapping = new Discord.Collection();
        this.categoriesEmbed = new Discord.MessageEmbed();
        this.originalMessage = message;
        this.categoryCommandMapping = new Discord.Collection();
        this.categoryColourMapping = new Discord.Collection();
        this.postedMessage = null;
        this.usedEmojis = [];
        this.stopAddingReactions = false;

        this.categoriesEmbed.setColor(APP_MAIN_COLOUR);
        this.categoriesEmbed.setFooter('Click on one of the reactions below');

        for (let category of Object.values(CommandCategory)) {
            this.categoryColourMapping.set(category, APP_MAIN_COLOUR);
        }

        this.categoryColourMapping.set(CommandCategory.RESOURCE, 'fdfd96');
    }

    /**
     * @param {Command} Command
     */
    async init(Command) {
        const callableCommands = new Discord.Collection();
        const commandList = Command.commandList.keyArray();

        for (let i = 0; i < commandList.length; i++) {
            const commandName = commandList[i];
            const command = cachelessRequire(`../${Command.commandList.get(commandName)}`);
            const isAllowed = await command.isAllowedForContext(this.originalMessage);

            if (isAllowed) {
                callableCommands.set(commandName, command);
            }
        }

        callableCommands.forEach((command, commandName) => {
            if (!this.categoryCommandMapping.has(command.category)) {
                this.categoryCommandMapping.set(command.category, new Discord.Collection());
            }

            this.categoryCommandMapping.get(command.category).set(commandName, command);
        });

        let i = 1;

        const categories = callableCommands.reduce((accumulator, command) => {
            if (!this.categoriesMapping.array().includes(command.category)) {
                let commandCategory = command.category.replace('_', ' ');
                commandCategory = `${commandCategory.slice(0, 1).toUpperCase()}${commandCategory.slice(1)}`;

                this.categoriesMapping.set(EmojiCharacters[i], command.category);
                this.usedEmojis.push(EmojiCharacters[i]);
                accumulator += `${EmojiCharacters[i]} ${commandCategory}\n`;
                i++;
            }

            return accumulator;
        }, '');

        this.categoriesEmbed.setTitle('Help command');
        this.categoriesEmbed.setDescription(
            'Spot stands for **S**imply **P**lural b**ot**. This bot is mainly used to generate changelogs and help ' +
            'with the definition of features, so recurring questions can be answered more quickly.\n' +
            '\n' +
            'Commands are classified by categories because displaying every command in this small box would be ' +
            'confusing and would break Discord\'s character limit. Click on a reaction to show the commands ' +
            'available in the corresponding category.\n' +
            '\n' +
            categories
        );

        return this.listCategories();
    }

    /**
     * @param {Collection<Snowflake, MessageReaction>} [collection]
     */
    async listCategories(collection) {
        this.stopAddingReactions = true;

        if (collection !== undefined && collection.size < 1) {
            await this.postedMessage.reactions.removeAll().catch(error => Logger.warning(error.message));
            return;
        }

        const member = await Guild.getMemberFromMessage(this.originalMessage);
        const filter = (reaction, user) => {
            const emoji = reaction.emoji.name;

            return this.usedEmojis.includes(emoji) && user.id === member.user.id;
        };

        if (this.postedMessage === null) {
            this.postedMessage = await this.originalMessage.channel.send(this.categoriesEmbed).catch(error => Logger.warning(error.toString()));
        } else {
            await this.postedMessage.reactions.removeAll().catch(error => Logger.warning(error.message));
            await this.postedMessage.edit('', this.categoriesEmbed);
        }

        // 5 minutes
        this.postedMessage.awaitReactions(filter, { time: 300000, max: 1 }).then(this.listCommands.bind(this)).catch(Logger.exception);
        this.stopAddingReactions = false;

        for (let i = 0; i < this.usedEmojis.length && !this.stopAddingReactions; i++) {
            await this.postedMessage.react(this.usedEmojis[i]).catch(error => Logger.warning(error.message));
        }
    }

    /**
     * @param {Collection<Snowflake, MessageReaction>} collection
     */
    async listCommands(collection) {
        this.stopAddingReactions = true;
        await this.postedMessage.reactions.removeAll().catch(error => Logger.warning(error.message));

        if (collection.size < 1) {
            this.postedMessage.edit('Timed out! You may send the command again.');
            return;
        }

        const member = await Guild.getMemberFromMessage(this.originalMessage);
        const filter = (reaction, user) => {
            const emoji = reaction.emoji.name;

            return emoji === '↩️' && user.id === member.user.id;
        };

        const category = this.categoriesMapping.get(collection.first().emoji.name);
        const commandsEmbed = new Discord.MessageEmbed();
        const commands = this.categoryCommandMapping.get(category).reduce((accumulator, command, commandName) => {
            accumulator += `**${Config.prefix}${commandName}** ${command.description}\n\n`;

            return accumulator;
        }, '');

        commandsEmbed.setTitle('Help command');
        commandsEmbed.setDescription(commands);
        commandsEmbed.setColor(this.categoryColourMapping.get(category));
        commandsEmbed.setFooter('Click on one of the reactions below');

        this.postedMessage.edit('', commandsEmbed);

        // 5 minutes
        this.postedMessage.awaitReactions(filter, { time: 300000, max: 1 }).then(this.listCategories.bind(this)).catch(Logger.exception);

        await this.postedMessage.react('↩️').catch(error => Logger.warning(error.message));
    }
}

class Help
{
    static instance = null;

    constructor() {
        if (Help.instance !== null) {
            return Help.instance;
        }

        this.aliases = ['commands'];
        this.category = CommandCategory.INFO;
        this.isAllowedForContext = CommandPermission.yes;
        this.description = 'Provides the list of commands';
    }

    /**
     * @param {Message} message
     * @param {Array} args
     * @param {Command} Command
     */
    async process(message, args, Command) {
        const dialog = new HelpDialog(message);

        return dialog.init(Command);
    }
}

module.exports = new Help();
