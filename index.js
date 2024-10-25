const dotenv = require('dotenv/config')
const fs = require('fs')
const { Client, GatewayIntentBits } = require('discord.js')
const express = require('express')
const basicAuth = require('express-basic-auth')

const app = express ()
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("REST on ", PORT);
})

app.use(basicAuth({
	users: { "Arbor": process.env.PASSWORD }
}))

app.get("/messages", (req, resp) => {
  resp.send(msg) 
})

const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
] })

client.on("ready", () => {
  console.log("Discord client ready")
})

client.on("messageCreate", (message) => {
  client.channels.fetch(message.channelId)
    .then(channel => {
    msg = message.author.username + "|" + channel.name + ">" + message.content

    msg = msg.replace(new RegExp(`.{${22}}`, 'g'), '$&' + "\n")
  })

  console.log(message)
})

let msg = ""

client.login(process.env.BOT_TOKEN)
