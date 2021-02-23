module.exports = {
	name: 'eval',
	description: 'Runs code.',
  usage: '<codeString>',
	args: true,
	execute(message, args, Discord, client) {
if (message.author.id == "671264149745041408" || message.author.id == "440231799533338634" || message.author.id == "783898662727057448") {
function evaluation() {
	try {
	 return eval(args.join(" "));
	} catch (err) {
		return err.toString();
	}
}
const evalEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle("Evaluation:").setDescription(evaluation());
message.channel.send({ embed: evalEmbed });
} else {
const evalFailedEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle("You can't do this!").setDescription("This is a developer testing command. Only developers can run this.");
message.channel.send({ embed: evalFailedEmbed });
}
},
};
