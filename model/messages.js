let names = {};
let messages = {};

const genRandomId = () => Math.ceil(Math.random() * 1000);

const load = () => require("../messages").forEach(msg => {
    let id = genRandomId();
    while (messages[id])
        id = genRandomId();

    msg.names.forEach(name => names[name] = id);
    messages[id] = msg;
});

load();

// interface Message {
//     names string[];
//     description string;
//     title string;
//     text string;
// }

const { MessageEmbed } = require("discord.js");

module.exports = {
    get names() {
        return names;
    },
    get messages() {
        return messages;
    },
    get: (name) => messages[names[name]],
    getList: () => Object.keys(messages).map(msg => ({ name: messages[msg].names[0], value: messages[msg].description })),
    getEmbed: (name) => {
        let msg = messages[names[name]];
        if (!msg) return;

        return {
            color: APP_MAIN_COLOUR,
            author: {
                name: msg.title,
                iconURL: bot.user.displayAvatarURL({ dynamic: true }),
            },
            description: msg.text,
        }
    },
    reload: () => {
        names = {};
        messages = {};
        delete require.cache[require.resolve("../messages")];
        load();
    }
}
