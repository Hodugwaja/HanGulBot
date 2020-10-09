const discord = require('discord.js');
const client = new discord.Client();
const {prefix, token} = require('./config.json')

const activities_list = [
    "NULL", 
    "한글날 날짜 확인",
    "한글 잘 쓰는지 확인",
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
    if(message.author.bot) {
        return NaN
    }
    if(message.channel.type == 'dm'){
        message.reply("DM은 안돼요");
        return;
    }
    
    const args = message.content.split("");
    const arg = message.content.substring(prefix.length).split(" ");
    const user = client.users.cache.get(message.author.id);
    switch(arg[0]){
        case "도움말":
            
            const embedAsk = new discord.MessageEmbed()
                .setColor('#FFD700')
                .setAuthor('체리봇 한글날 ver')
                .setDescription("체리봇 한글날 버전은 한글날을 기념하기 위해 만든 봇입니다. 한글날에 관련된 재미있는 일화와 구름 서버에 한글날을 맞추는 역할을 합니다. 코드는 오픈소스이기 때문에 마음껏 가져가셔도 됩니다만, id값들은 바꿔주시기 바랍니다")
                .addField("만든놈", "호두과자, 카나미(도움) ", false)
                .addField("체리야 도움말", "체리봇의 사용설명서가 나옵니다")
                .addField("체리야 한글날", "한글날에 대한 설명이 나옵니다")
                .setThumbnail('https://imgur.com/OxKN36H.jpg')
                .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg')
            user.send(embedAsk);
            break;
        case "한글날":
            const embedHangulNal = new discord.MessageEmbed()
                .setColor('#FFD700')
                .setAuthor('한글날')
                .setDescription("한글날은 1446년 10월 9일, 한글 반포를 ")
                .addField("","", false)
                .addField("체리야 도움말", "체리봇의 사용설명서가 나옵니다")
                .addField("체리야 언해본", "훈민정음 언해본에 대한 설명이 나옵니다")

                .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
            user.send(embedHangulNal);
            break;
        case "언해본":
            const embedUnHaeBon = new discord.MessageEmbed()
                .setColor("#ffd700")
                .setAuthor("훈민정음 언해본 서문(이외 생략)")
                .setDescription("나랏〮말〯ᄊᆞ미〮\n中듀ᇰ國귁〮에〮달아〮\n文문字ᄍᆞᆼ〮와〮로〮서르ᄉᆞᄆᆞᆺ디〮아니〮ᄒᆞᆯᄊᆡ〮\n이〮런젼ᄎᆞ〮로〮어린〮百ᄇᆡᆨ〮姓셔ᇰ〮이〮니르고〮져〮호ᇙ〮배〮이셔〮도〮\nᄆᆞᄎᆞᆷ〮내〯제ᄠᅳ〮들〮시러〮펴디〮몯〯ᄒᆞᇙ노〮미〮하니〮라〮\n내〮이〮ᄅᆞᆯ〮為윙〮ᄒᆞ〮야〮어〯엿비〮너겨〮\n새〮로〮스〮믈〮여듧〮字ᄍᆞᆼ〮ᄅᆞᆯ〮ᄆᆡᇰᄀᆞ〮노니〮\n사〯ᄅᆞᆷ마〯다〮ᄒᆡ〯ᅇᅧ〮수〯ᄫᅵ〮니겨〮날〮로〮ᄡᅮ〮메〮便뼌安ᅙᅡᆫ킈〮ᄒᆞ고〮져〮ᄒᆞᇙᄯᆞᄅᆞ미〮니라〮")
            message.channel.send(embedUnHaeBon);          
                break;
        case "세종대왕" :
            break;
        case "세종대왕2":
            break;
        case "공동창제설":
        case "단독창제설":
            const embedWhoMadeHangul = new discord.MessageEmbed()
                .setColor('#ffd700')
                .setAuthor("한글을 누가 만들었을까?")
                .setDescription("한글을 누가 만들었늕")
            user.send(embedWhoMadeHangul);
    }
    
    const argTopic = message.channel.topic.split(" ");
    for(var k = 0; k < argTopic.length; k++){
        if(argTopic[k] === "#한글날"){  
            for(var i = 0; i<args.length; i++){
                for(var j = 0; j<alphabet.length; j++){
                    if(args[i] == alphabet[j]){
                        message.delete();
                        const channel = message.guild.channels.cache.find(ch => ch.topic == '#기록');
                        if(channel){
                            const GyungGo = message.guild.channels.cache.get(channel.id);
                            const embedGyungGo = new discord.MessageEmbed()
                                    .setColor(`#ff0000`)
                                    .setAuthor("영어 인식!!")
                                    .setDescription("<@" + message.author.id + "> 님께서 영어를 사용하셨습니다")
                                    .addField("사용하신 곳", "<#"+message.channel.id + ">", false)
                                    .addField("해당 문장", message.content)
                                    .setThumbnail(`${message.author.avatarURL()}`)
                                .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
                                GyungGo.send(embedGyungGo);
                            return;
                        }   
                    }
                }
            }
        }
        if (message.content === '!react') {
            message.react('😄');
        }
    }
})

client.login(token);