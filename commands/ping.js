module.exports = {
	name: 'ping',
	description: 'Ping, pong. Get the latency of the bot.',
	execute(message, args, Discord, client) {
const pingEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle("Pong!").setDescription(`Latency: ${Date.now() - message.createdTimestamp}ms.\nAPI Latency: ${Math.round(client.ws.ping)}ms`);
message.channel.send({ embed: pingEmbed });
			},
};
