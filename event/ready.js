const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../config.json');
const Guild = require('../model/guild');

module.exports = async () => {
    Logger.info('Logged in as ' + bot.user.username + '#' + bot.user.discriminator);

    Logger.info('--------');

    Logger.info('Syncing guilds...');
    await Guild.init();
    Logger.info('Guilds synced. Serving in ' + Guild.discordGuild.name);

    Logger.info('--------');

    if (process.argv[3] === '--reboot') {
        bot.users.cache.get(Config.mom).send(`I'm back :) !`);
    }
};
