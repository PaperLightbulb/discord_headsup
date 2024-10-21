const dotenv = require('dotenv/config')
const fs = require('fs')
const { Client, GatewayIntentBits } = require('discord.js')
const express = require('express')

const app = express ()
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("REST on ", PORT);
})

const users = {
  process.env.USERNAME: process.env.PASSWORD
}

app.use('/messages', basicAuth({
  users: users,
  challenge: true // Prompt for credentials
}))

app.get("/messages", (req, resp) => {
  let messages_as_text = ""

  for (let msg of messages) {
    messages_as_text = messages_as_text + msg + "\n"
  }

  resp.send(messages_as_text) 
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
  let msg = message.author.username.substring(0,5) + ">"+ message.content 
  while (msg.length > 0) {
    messages.push(msg.substring(0, Math.min(20, msg.length)))
    msg = msg.substring(Math.min(20, msg.length))
  }

  while (messages.length > 6) {
    messages.shift()
  }

  console.log(messages)
})

let messages = []

client.login(process.env.BOT_TOKEN)
