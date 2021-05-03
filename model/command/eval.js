const Discord = require('discord.js');
const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../../config.json');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

// Including every model here so that it's ready to be used by the command
const Guild = require('../guild');

const JAVASCRIPT_LOGO_URL = 'https://i.discord.fr/IEV8.png';

class Eval
{
    static instance = null;

    constructor() {
        if (Eval.instance !== null) {
            return Eval.instance;
        }

        this.aliases = [];
        this.category = CommandCategory.BOT_MANAGEMENT;
        this.isAllowedForContext = CommandPermission.isMommy;
    }

    /**
     * @param {Message} message
     */
    async process(message) {
        const code = message.content
            .substr(Config.prefix.length + 'eval'.length)
            .trim()
            .replace(/(`{3})js\n(.+)\n\1/iu, '$2')
            .trim();

        await message.react('✔');
        Logger.notice('Eval: ' + code);
        let output = null;

        try {
            output = eval(`${code}`); // Spoopy! 🎃 🦇 👻 ☠ 🕷
        } catch (exception) {
            output = `**${exception.name}: ${exception.message}**\n${exception.stack}`;
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor('Eval', JAVASCRIPT_LOGO_URL)
            .setColor(0x00FF00)
            .setDescription(output);

        message.channel.send(embed).catch(error => Logger.warning(error.toString()));
    }
}

module.exports = new Eval();
