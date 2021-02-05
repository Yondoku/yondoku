const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { version } = require('./package.json');
const client = new Discord.Client();
const constants = Discord.Constants;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
//ready status
client.once('ready', () => {
	console.log('Bot ready');
	client.user.setActivity(`Yondoku v${version} || y/help`, {type: 'PLAYING'});
});
//message status
client.on('message', async message => {
	if (message.author.bot) {return;}


	if (!message.content.startsWith(prefix)) return;
//command things

	const args = message.content.slice(prefix.length).split(" ");
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('This command doesn\'t work in DMs. Try again in a server.');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}.`;

		if (command.usage) {
			reply += `\nThe proper usage is \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
//cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = 3000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const cooldownEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle('Chill out!').setDescription(`You\'ve used this command recently! Wait ${timeLeft.toFixed(2)} seconds to run it again.`);
			return message.channel.send({ embed: cooldownEmbed });
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, Discord);
	} catch (error) {
		console.error(error);
		//oofus error
		const errorEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle('Oops!').setDescription(`There was a problem! If this error persists, contact the bot owner.`);
		message.channel.send({ embed: errorEmbed })
	}
});
client.login(token);