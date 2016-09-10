'use strict';

const config = require('./config');
const Promise = require('bluebird');
const Discord = require('discord.js');
const redis = require('./redis');
const util = require('./util');

const bot = new Discord.Client({
	autoReconnect: true,
	compress: true,
	forceFetchUsers: true,
});

bot.login(config.botToken);
bot.on('ready', () => {
	const guild = bot.guilds.get(config.guildId);
	return Promise.each(guild.members.array(), member => {
		return util.syncMCRolesForUser(member.id, guild)
		.catch(err => console.error(err, err.stack));
	})
	.finally(() => process.exit(0));
});
