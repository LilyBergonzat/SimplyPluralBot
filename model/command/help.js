const CommandPermission = require('../command-permission');
const CommandCategory = require('../command-category');

const commands = require('../command').commandList;
const messages = require('../messages');

const cachelessRequire = (path) => {
    if (!typeof path === 'string') {
        delete require.cache[require.resolve(path)];
    }

    return typeof path === 'string' ? require(path) : null;
};

const cleanString = (str) => str === null || str === undefined ? null : str
    .replace("_", " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const mainPage = (id) => {
    const buttons = Object.keys(CommandCategory).map(c => ({
        type: 2,
        style: 1,
        label: cleanString(c),
        custom_id: `help-${id}-${c}`,
    }))

    return {
        embeds: [{
            title: "Help command",
            color: 0xA95B44,
            description:
                'Spot stands for **S**imply **P**lural b**ot**. This bot is mainly used to generate changelogs and help ' +
                'with the definition of features, so recurring questions can be answered more quickly.\n' +
                '\n' +
                'Commands are classified by categories because displaying every command in this small box would be ' +
                'confusing and would break Discord\'s character limit. Click on a buttom below to show the commands ' +
                'available in the corresponding category, or type `.help <category name>`.\n'
        }],
        components: [{
            "type": 1,
            "components": buttons,
        }]
    }

}

const categoryPage = (cat, id, direct = false) => {
    const c = Object.values(CommandCategory).map(x => cleanString(x).toLowerCase());
    if (!c.includes(cat.toLowerCase()))
        return;

    let data = {
        embeds: [{
            title: `Help command | ${cleanString(cat)}`,
            color: 0xA95B44,
        }],
        components: [{
            "type": 1,
            "components": [{
                type: 2,
                style: 2,
                label: "Back",
                custom_id: `help-${id}-home`,
            }],
        }]
    };

    if (direct) delete data.components;

    if (cat.toLowerCase() == cleanString(CommandCategory.RESOURCE).toLowerCase())
        data.embeds[0].fields = messages.getList();
    else
        data.embeds[0].fields = Array.from(commands.keys()).map(x => {
            const cmd = cachelessRequire(commands.get(x).split("command/").join(""));
            if (cleanString(cmd.category)?.toLowerCase() != cat.toLowerCase()) return;
            return { name: x, value: cmd.description ?? "No description."};
        }).filter(x => x);

    return data;
}

class Help
{
    constructor() {
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
    async process(message, args, command) {
        if (!args[0])
            await bot.api.channels(message.channel.id).messages.post({ data: mainPage(message.author.id) });
        else
            await bot.api.channels(message.channel.id).messages.post({ 
                data: 
                    categoryPage(args.join(" "), message.author.id, true) 
                    ?? {
                        content: "Category not found.", 
                        message_reference: { message_id: message.id, guild_id: message.guild?.id },
                        allowed_mentions: { parse: [] },
                    }
            })
    }
}

module.exports = new Help();

module.exports.interactionHandler = async (event) => {
    const user = event.member.user.id;
    const custom_id = event.data.custom_id;

    let ret;

    if (!custom_id.startsWith(`help-${user}`))
        ret = {
            type: 4,
            data: {
                flags: 64,
                content: "This help command was sent by someone else. Please run `.help` again.",
            },
        }
    else if (custom_id.endsWith('home')) 
        ret = { type: 7, data: mainPage(user) };
    else {
        let page = categoryPage(cleanString(custom_id.split(`help-${user}-`).join("")), user);
        if (page) ret = { type: 7, data: page };
        else ret = { type: 4, data: { flags: 64, content: "Category not found." }}
    }

    return await bot.api.interactions(event.id, event.token).callback.post({ data: ret })
}
