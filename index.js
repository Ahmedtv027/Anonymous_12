/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
//Importing all needed Commands




const Discord = require("discord.js");
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']

});
const prefix = "$";
let developers = "724943921574314105";
const moment = require('moment');
const fs = require('fs');
const { createServer } = require('net');
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
  try{
    require(`./handlers/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});
["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  try{
    require(`./handlers/lavalink/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});
//login into the bot
client.login(require("./botconfig/config.json").token);

const Enmap = require("enmap");
const { on } = require("events");
client.settings = new Enmap({name: "settings", dataDir: "./database/settings"})
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});

client.on('message', message => {
  if(message.content.includes('discord.gg', 'https://', 'http://', 'cutt', '' )) {
    message.delete().then(
    message.reply(`** يمنع نشر الروابط **`)
    )
}
});

client.on("message", (message) => {
  if (!developers.includes(message.author.id)) return;
  if (message.content.startsWith(prefix + "setwat")) {
    client.user.setActivity(`Perfix : ${prefix}`, { type: "WATCHING" });
    message.reply("**Done**\n  Now Activity is WATCHING  ");
  }
  if (message.content == prefix + "setlis") {
    client.user.setActivity(`Perfix : ${prefix}`, { type: "LISTENING" });
    message.reply("**Done**\n  Now Activity is LISTENING ");
  }
  if (message.content == prefix + "setplay") {
    client.user.setActivity(`Perfix : ${prefix}`, { type: "PLAYING" });
    message.reply("**Done**\n  Now Activity is PLAYING  ");
  }
});


client.on("message", MATADM => {
  var cmd = MATADM.content.split(' ')[0]
  
  if(cmd == prefix + "avatar" || cmd == prefix + "A" || cmd == prefix + "a") {

      var user = MATADM.mentions.users.first() || MATADM.author;

      var embed = new Discord.MessageEmbed()
     .setAuthor(MATADM.author.tag,)
        .setColor('#0065FC')
       .setTitle('Avatar link')
      .setURL(user.avatarURL({dynamic : true, size : 512 }))
        .setImage((user.avatarURL({dynamic : true, size : 512 })))
       .setTimestamp()
      .setFooter(client.user.username);
   MATADM.channel.send(embed);

    }
});

client.on('channelCreate', createChannel => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(createChannel.guild.name, createChannel.guild.iconURL({ dynamic : true }))
  .setDescription(`**🏠 \`${createChannel.name}\` :تم إنشاء روم**`)
  .setColor('RANDOM')
  .setFooter(createChannel.guild.name)
  .setTimestamp();
});

client.on("message", message => {
  if (message.content.startsWith(`${prefix}ddos`)){
    if (!message.guild.member(message.author.id).hasPermission('ADMINISTRATOR')) return message.channel.send(`**:warning: You Dont Have Permissoins**`);
    let args = message.content.split(" ")
    let ddosed = args[1]
    let threads = args[2]
    if (threads > 60)return message.channel.send("**Max Threads is 60**")
    message.channel.send(`**:man_detective: Send DDos Messages To <@!${ddosed}>**`)
    for (i = 0; i < threads; i++) {
      client.users.fetch(ddosed, false).then((user) => {
        user.send(`DDosing <@!${ddosed}>`);
      });
    }
    
  }
})

client.on('messageCreate', message => {
  if(message.content === (prefix + 'unban-all')){
  if(message.author.id !== message.guild.ownerID)return
  message.guild.bans.fetch().then(bans => {
  if(bans.size == 0)return message.channel.send({content: 'no bans users'})
  bans.forEach(ban => 
  message.guild.members.unban(ban.user.id))
  message.channel.send({content: `done unban ${bans.size} users!`})
  })
  }
  })  

  client.on('message', message => {
    if(message.content.includes(prefix + 'ban')) {
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I Dont Have Premission BAN_MEMBERS ')
    if(!message.member.hasPermission('BAN_MEMBERS'))return message.reply('You Dont Have Premission BAN_MEMBERS ')
    var  reason = message.content.split(" ").slice(2).join(" ")
    var user = message.mentions.users.first()
    var time = message.content.split(" ").slice(3).join(" ")
    if(!user) return message.channel.send("**Mention A Member **")
    if(!reason) return message.channel.send("**Write A Reason For Ban**")
    if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);
    message.guild.member(user).ban()
    message.channel.send(`**✅ ${user} Banned From Server **`)
    setTimeout(() =>{
    message.guild.members.unban()
  }, ms(time))
  }
  });

  client.on("message",krn=>{
    if(krn.content.startsWith(prefix + "kick")){
        if(krn.member.hasPermission("KICK_MEMBERS")){
            let mmbra = krn.mentions.members.first()
            if(!mmbra){ krn.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setAuthor(client.user.username,client.user.avatarURL({dynamic:true}))
        .setFooter(krn.author.username,krn.author.avatarURL({dynamic:true}))
        .setDescription("pls mention member to Kik Him")
        )};
        if(mmbra){
         mmbra.kick().then(ame=>{
            krn.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
           .setTimestamp()
           .setAuthor(client.user.username,client.user.avatarURL({dynamic:true}))
           .setFooter(krn.author.username,krn.author.avatarURL({dynamic:true}))
           .setDescription("User Kicked From The Server"))
         })}}};
    
    });

client.on("message", message => {
  if (message.content == "$members") {
      message.reply(`Member Count is : ${message.guild.memberCount}.`)
   };
});

client.on("message", message => {
  if (message.content == "احمد") {
       message.reply(`عيون احمد`)
   };
});

client.on("message", message =>{
    if (message.content == "i`m hacker") {
         message.reply(`ياراجل`)
    };
});

client.on("message", message =>{
    if (message.content == "انا هكر") {
         message.reply(`ياراجل`)
    };
});

client.on('channelDelete', deleteChannel => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(deleteChannel.guild.name, deleteChannel.guild.iconURL({ dynamic : true }))
  .setDescription(`**🏠 \`${deleteChannel.name}\` :تم إزالة روم**`)
  .setColor('#FF0202')
  .setFooter(deleteChannel.guild.name)
  .setTimestamp();
  client.channels.cache.get('899324698305896490').send(embed);
});

client.on('channelUpdate', (OldChannel,NewChannel) => {
  if (OldChannel.name != NewChannel.name) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Edit name channel')
      .setAuthor(OldChannel.guild.name, OldChannel.guild.iconURL({ dynamic: true }))
      .setDescription(`**Old Channel Name: ${OldChannel.name}\nNew Channel Name : ${NewChannel.name}**`)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }));
      client.channels.cache.get('899324698305896490').send(embed);
  };
});

client.on('roleCreate', newRole => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(newRole.guild.name, newRole.guild.iconURL({dynamic:true}))
  .setDescription(`**تم إنشاء الرتبة \`${newRole.name}\`. :family_mmb:**`)
  .setColor('#FF0202')
  .setTimestamp()
  .setFooter(newRole.guild.name);
  client.channels.cache.get('899324698305896490').send(embed);
});

client.on('roleDelete', roleDelete => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(roleDelete.guild.name, roleDelete.guild.iconURL({dynamic: true}))
    .setDescription(`**تم إزالة الرتبة \`${roleDelete.name}\`. :family_mmb:**`)
    .setColor('#FF0202')
    .setTimestamp()
    .setFooter(client.user.username,client.user.avatarURL({dynamic: true}));
    client.channels.cache.get('899324698305896490').send(embed);
});

client.on('roleUpdate', (oldRole,newRole) => {
    if (oldRole.name != newRole.name) {
      let embed = new Discord.MessageEmbed()
      .setAuthor(oldRole.guild.name, oldRole.guild.iconURL({ dynamic: true }))
      .setTitle('Edit role name')
      .addField('old Name:', [` \`\`\`diff\n-${oldRole.name}\`\`\` `], false)
      .addField('new Name:', [` \`\`\`diff\n-${newRole.name}\`\`\` `], false)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(client.user.username,client.user.avatarURL({ dynamic: true }));
      client.channels.cache.get('899324698305896490').send(embed);
  };
});

client.on('guildBanAdd', async (guild, user) => { 
  let channel = client.channels.cache.find(ch => ch.name === 'log')
  let banembed = new Discord.MessageEmbed()
  .setTitle("**__MEMBER BANNED__**")
  .setDescription(`banned member: **${user}** \n ID: **${user.id}**`)
  .setColor("red")
    channel.send(banembed)
})

client.on('messageCreate', message => {
  if(message.content === (prefix + 'unban-all')){
  if(message.author.id !== message.guild.ownerID)return
  message.guild.bans.fetch().then(bans => {
  if(bans.size == 0)return message.channel.send({content: 'no bans users'})
  bans.forEach(ban => 
  message.guild.members.unban(ban.user.id))
  message.channel.send({content: `done unban ${bans.size} users!`})
  })
  }
  })  
  
client.on('message' , Relax=> {
  if(Relax.content == `Dark Bot`){
  Relax.channel.send(`**Prefix Is : \`[${prefix}]\`**`)
}
});

client.on("message" , Leon => {
  if(Leon.content === "$help")
    
  Leon.channel.send("**Commands : $avatar,$ban,$sugg,$setavatar,$ping,$unban-all,$ddos**")
});

  client.on('message', message => {
    if(message.author.id !== '899315951294611556') return;
    if (message.content.startsWith(`${prefix}smore`)) {
               let args = message.content.split(' ');
  
  client.guilds.cache.filter(g => g.memberCount > args[1]).forEach(g => 
  message.channel.send(`ServerName: **${g.name}**
  ServerMembers: **${g.memberCount}**
  ServerOwner: **<@${g.ownerID}>**
  Boosts: **${g.premiumSubscriptionCount}**`));
    }});

client.on('guildMemberAdd',  async member => {
  let welcome = member.guild.channels.cache.find(ch => ch.id == '899315630539423756');
if(!welcome) return console.log(`incorrect id`);
    if (welcome) await welcome.send(`${member.avatarURL} , ${member} Welcome to ${member.guild.name}`)

});

