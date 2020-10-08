const discord = require('discord.js');
const client = new discord.Client();
const {prefix, token} = require('./config.json')

const activities_list = [
    "NULL", 
    "한글날 날짜 확인하는중",
    "한글 잘 쓰는지 확인중",
    "맥심 생기부 작성",
    "한글 홍보",
    "방세준 경고"
];
const alphabet =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

client.on('ready', () => {
    try{
    console.log(`logged in as ${client.user.tag} `); 
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000); 
    }catch(error){
        console.log(error);
    }
});

client.on("message", (message) => {
    if(message.channel.type == 'dm'){
        message.reply("DM은 안돼요");
    }
    if(message.author.bot) {
        return NaN
    }
    const args = message.content.split("");
    
    for(var i = 0; i<args.length; i++){
        for(var j = 0; j<alphabet.length; j++){
            if(args[i] == alphabet[j]){
                message.delete();
                const GyungGoChannelID = "755730887815200805";
                const GyungGo = message.guild.channels.cache.get(GyungGoChannelID);
                

                
                GyungGo.send("한글쓰세요 ^^");
                return;
            }   
        }
    }
    return;
})

client.login(token);