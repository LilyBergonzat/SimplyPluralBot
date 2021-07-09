const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../config.json');
const Discord = require('discord.js');

const cachelessRequire = (path) => {
    if (typeof path === 'string') {
        delete require.cache[require.resolve(path)];
    }

    return typeof path === 'string' ? require(path) : null;
};

const Guild = {
    /** {Guild} */
    discordGuild: null,

    /** {TextChannel} */
    appDiscussionChannel: null,

    /** {Collection} */
    messagesCache: new Discord.Collection(),

    init: async () => {
        Guild.discordGuild = bot.guilds.cache.find(guild => guild.id === Config.guild);
        Guild.appDiscussionChannel = Guild.discordGuild.channels.cache.find(channel => channel.id === Config.channels.appDiscussion);
    },

    /**
     * @param message
     * @returns {Promise.<GuildMember|null>}
     */
    getMemberFromMessage: async (message) => {
        return await Guild.discordGuild.members.fetch(message.author).catch(exception => {
            Logger.error(exception.toString());

            return null;
        });
    },

    /**
     * @param {GuildMember} member
     */
    isMemberMod: (member) => {
        return member !== undefined && member !== null && member.roles.cache.has(Config.roles.mod);
    },

    /**
     * @param {string} roleName
     * @returns {Role|null}
     */
    getRoleByName: (roleName) => {
        return roleName === undefined || roleName === null ? null : Guild.discordGuild.roles.cache.find(
            role => role.name.toLowerCase() === roleName.toLowerCase()
        );
    },

    /**
     * @param {GuildMember} member
     * @param {Snowflake} snowflake - The Role snowflake.
     * @returns {boolean}
     */
    memberHasRole: (member, snowflake) => {
        return member !== undefined && member !== null && member.roles.cache.some(role => role.id === snowflake);
    },

    /**
     * @param {Message} message
     * @returns {Discord.MessageEmbed}
     */
    messageToEmbed: async (message) => {
        const member = await Guild.getMemberFromMessage(message);
        const suffix = member !== null && member.nickname !== null && member.nickname !== undefined ? ` aka ${member.nickname}` : '';
        const embeds = message.embeds.filter(embed => embed.author.name && embed.author.iconURL);

        let authorName = `${message.author.username}#${message.author.discriminator}${suffix}`;
        let authorImage = message.author.displayAvatarURL({ dynamic: true });
        let description = message.content;
        let timestamp = message.createdTimestamp;
        let image = null;

        if (message.attachments.size > 0) {
            image = message.attachments.first().url;
        }

        if (description.length < 1 && embeds.length > 0) {
            const embed = embeds[0];
            description = embed.description ? embed.description.trim() : '';

            if (message.author.bot) {
                if (embed.author) {
                    authorName = embed.author.name;
                    authorImage = embed.author.iconURL;
                }

                if (embed.timestamp) {
                    timestamp = embed.timestamp;
                }

                if (embed.image) {
                    image = embed.image.url;
                }
            }
        }

        return new Discord.MessageEmbed()
            .setAuthor(authorName, authorImage)
            .setColor(0x00FF00)
            .setDescription(description)
            .setTimestamp(timestamp)
            .setImage(image);
    },

    /**
     * @param {Message} message
     * @returns {{certain: boolean, foundMembers: Array}}
     */
    findDesignatedMemberInMessage: (message) => {
        let foundMembers = [];
        let certain = true;
        const memberList = bot.users.cache.concat(Guild.discordGuild.members.cache);

        if (message.mentions.members !== null && message.mentions.members.size > 0) {
            foundMembers = message.mentions.members.array();
        } else if (message.content.match(/[0-9]{18}/u) !== null) {
            const ids = message.content.match(/[0-9]{18}/gu);

            ids.map(id => {
                if (memberList.has(id)) {
                    foundMembers.push(memberList.get(id));
                }
            });
        } else {
            certain = false;
            memberList.forEach(member => {
                const user = member.user === undefined ? member : member.user;

                const hasNickname = member.nickname !== undefined && member.nickname !== null;
                const nickname = hasNickname ? `${member.nickname.toLowerCase()}#${user.discriminator}` : '';
                const username = `${user.username.toLowerCase()}#${user.discriminator}`;
                const content = message.cleanContent.toLowerCase().split(' ').splice(1).join(' ');

                if (content.length > 0) {
                    const contentInNickname = hasNickname ? nickname.indexOf(content) > -1 : false;
                    const contentInUsername = username.indexOf(content) > -1;
                    const nicknameInContent = hasNickname ? content.indexOf(nickname) > -1 : false;
                    const usernameInContent = content.indexOf(username) > -1;

                    if (contentInNickname || contentInUsername || nicknameInContent || usernameInContent) {
                        foundMembers.push(member);
                    }
                }
            });
        }

        return {
            certain,
            foundMembers
        };
    },

    guildMemberAddHandler: (member) => {
        Guild.appDiscussionChannel.send(`Welcome, ${member}! Just so you are aware, we are slowly recovering from a DDoS attack. If you are having trouble connecting to the app, please make sure you are on the latest version. If you are still unable to connect, you can note your switches in <#862595352917442570> so that you have them for when the server has recovered. We thank you for your patience!`)
    }
};

module.exports = Guild;