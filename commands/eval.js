module.exports = {
	name: 'eval',
	description: 'Runs code.',
  usage: '<codeString>',
	args: true,
	execute(message, args, Discord) {
if (message.author !== "<@671264149745041408>") return;
message.channel.send(eval(args.join(" ")));
			},
};
