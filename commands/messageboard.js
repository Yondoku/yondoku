const fs = require("fs");
module.exports = {
	name: 'messageboard',
	description: 'Either gets the newest message on the message board, or changes the message on the message board.',
  usage: '[textString]',
  execute(message, args, Discord) {
if (!args.length) {
  const messageboardEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle('Message board says...').setDescription(fs.readFileSync('messageboard.txt'));
  return message.channel.send({ embed: messageboardEmbed });
}
  const messageboardsetEmbed = new Discord.MessageEmbed().setColor('#5d83a2').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setTitle('Done!').setDescription('Set the message board!');
fs.writeFile('messageboard.txt', args.join(" "));
message.channel.send({ embed: messageboardsetEmbed });
			},
};
