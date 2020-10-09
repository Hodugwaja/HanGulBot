from discord.ext import tasks
from itertools import cycle
import datetime
import discord
import json
import re

with open('config.json', 'r', -1, 'utf-8') as data:
    config = json.loads(data.read())

client = discord.Client()
activities_list = cycle([
    "None",
    "한글날 날짜 확인",
    "한글 잘 쓰는지 확인",
    "맥심 생기부 작성",
    "한글 홍보",
    "방세준 경고"
])


@tasks.loop(seconds=10)
async def change_activity():
    await client.change_presence(activity=discord.Game(next(activities_list)))


@client.event
async def on_ready():
    print(f'logged in as {client.user}')
    change_activity.start()


@client.event
async def on_message(message):
    dev = str(client.get_user(533120411274182666))
    if dev == "None":
        dev = '호두과자#8981'
    if message.author.bot:
        return None
    if str(message.channel.type) == "private":
        await message.channel.send('DM은 안돼요')
        return None
    try:
        cmd = message.content.split(config['prefix'])[1].split()[0]
        if cmd == "도움말":
            embed = discord.Embed(
                color=0xFFD700,
                timestamp=datetime.datetime.now(),
                description="체리봇 한글날 버전은 한글날을 기념하기 위해 만든 봇입니다.\n" + \
                            "한글날에 관련된 재미있는 일화와 구름 서버에 한글날을 맞추는 역할을 합니다.\n" + \
                            "코드는 오픈소스이기 때문에 마음껏 가져가셔도 됩니다만, ID 값은 바꿔주시기 바랍니다.\n" + \
                            "파이썬 버전도 동일합니다!")
            embed.set_author(name='체리봇 한글날 ver')
            embed.add_field(name='만든 사람들', value="호두과자, 카나미(도움)", inline=False)
            embed.add_field(name="체리야 도움말", value="체리봇의 사용설명서가 나옵니다", inline=False)
            embed.add_field(name="체리야 한글날", value="한글날에 대한 설명이 나옵니다", inline=False)
            embed.add_field(name="체리야 언해본", value="훈민정음 언해본에 대한 설명이 나옵니다")
        if cmd == "한글날":
            embed = discord.Embed(
                color=0xFFD700,
                timestamp=datetime.datetime.now(),
                description="한글날은 한글의 우수성을 널리 알리고 세종대왕의 성덕과 위업을 기리기 위한 기념일로,\n" +\
                            "매년 10월 9일에 기념하며, 5대 국경일이기 때문에 태극기를 게양해야 한다.")
            embed.set_author(name='한글날')
            embed.add_field(name='만든 사람들', value="호두과자, 카나미(도움)", inline=False)
            embed.add_field(name="체리야 도움말", value="체리봇의 사용설명서가 나옵니다", inline=False)
            embed.add_field(name="체리야 한글날", value="한글날에 대한 설명이 나옵니다", inline=False)
            embed.add_field(name="체리야 언해본", value="훈민정음 언해본에 대한 설명이 나옵니다")
        if cmd == "언해본":
            embed = discord.Embed(
                color=0xFFD700,
                timestamp=datetime.datetime.now(),
                description='나랏〮말〯ᄊᆞ미〮\n' + \
                            '中듀ᇰ國귁〮에〮달아〮\n' + \
                            '文문字ᄍᆞᆼ〮와〮로〮서르ᄉᆞᄆᆞᆺ디〮아니〮ᄒᆞᆯᄊᆡ〮\n' + \
                            '이〮런젼ᄎᆞ〮로〮어린〮百ᄇᆡᆨ〮姓셔ᇰ〮이〮니르고〮져〮호ᇙ〮배〮이셔〮도〮\n' + \
                            'ᄆᆞᄎᆞᆷ〮내〯제ᄠᅳ〮들〮시러〮펴디〮몯〯ᄒᆞᇙ노〮미〮하니〮라〮\n' + \
                            '내〮이〮ᄅᆞᆯ〮為윙〮ᄒᆞ〮야〮어〯엿비〮너겨〮\n' + \
                            '새〮로〮스〮믈〮여듧〮字ᄍᆞᆼ〮ᄅᆞᆯ〮ᄆᆡᇰᄀᆞ〮노니〮\n' + \
                            '사〯ᄅᆞᆷ마〯다〮ᄒᆡ〯ᅇᅧ〮수〯ᄫᅵ〮니겨〮날〮로〮ᄡᅮ〮메〮便뼌安ᅙᅡᆫ킈〮ᄒᆞ고〮져〮ᄒᆞᇙᄯᆞᄅᆞ미〮니라〮')
            embed.set_author(name='훈민정음 언해본 서문(이외 생략)')
        embed.set_footer(text=dev, icon_url='https://imgur.com/DD3DQxx.jpg')
        await message.channel.send(embed=embed)
        return None
    except:
        if '#한글날' in message.channel.topic.split(' '):
            if list(filter(None, re.findall(r'[a-zA-Z]*', message.content))):
                await message.delete()

                used = ', '.join(list(filter(None, re.findall(r'[a-zA-Z]*', message.content))))
                embed = discord.Embed(
                    color=0xA4000F,
                    timestamp=datetime.datetime.now(),
                    description=f"{message.author.mention}님께서 영어를 사용하셨습니다."
                )
                embed.set_author(name='영어 인식!!')
                embed.add_field(name='사용하신 곳', value=message.channel.mention, inline=False)
                embed.add_field(name='해당되는 문장', value=f'```{message.content}```', inline=False)
                embed.add_field(name='해당되는 영어',
                                value=f"```{used}```",
                                inline=False)
                embed.set_footer(text=dev,
                                 icon_url='https://imgur.com/DD3DQxx.jpg')

                for channel in message.guild.text_channels:
                    if channel.topic is not None and '#기록' in channel.topic.split(' '):
                        await channel.send(embed=embed)
                        return None
                await message.channel.send(embed=embed)
                return None
client.run(config['token'])
