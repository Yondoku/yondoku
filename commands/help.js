const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: '[commandName]',
	execute(message, args, Discord) {
    const data = [];
const { commands } = message.client;

if (!args.length) {
  data.push('Here\'s a list of all my commands:');
data.push(commands.map(command => command.name).join(', '));
data.push(`\nYou can type \`${prefix}help <command-name>\` to get info on a specific command.`);
return message.author.send(data, { split: true })
	.then(() => {
		if (message.channel.type === 'dm') return;
		const helpEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle(`I have sent you a DM with my commands!`).setDescription(`\nYou can type \`${prefix}help <command-name>\` to get info on a specific command.`);
	})
	.catch(error => {
		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		message.reply('Hmm, it seems that I can\'t DM you. Turn on DMs!');
	});
}
const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('That\'s not a command!');
}

data.push(`Name: ${command.name}`);

if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
if (command.description) data.push(`Description: ${command.description}`);
if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);

data.push(`Cooldown: ${command.cooldown || 3} seconds`);


const commandEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle('Command Help').setDescription(data);
message.channel.send({ embed: commandEmbed });
	},

};
