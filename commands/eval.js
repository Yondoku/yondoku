module.exports = {
	name: 'eval',
	description: 'Runs code.',
  usage: '<codeString>',
	args: true,
	execute(message, args, Discord) {
if (message.author.id !== "671264149745041408") return;
const evalEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle("Evaluation:").setDescription(
eval(function() {
try {
return eval(args.join(" "));
} catch (err) {
return err;
}

}));
message.channel.send({ embed: evalEmbed });
			},
};
