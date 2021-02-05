module.exports = {
	name: 'copy',
	description: 'Copies text.',
  usage: '<textString>',
	args: true,
	execute(message, args, Discord) {

		const copyEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setDescription(args.join(" "));
message.channel.send({ embed: copyEmbed });
			},
};
