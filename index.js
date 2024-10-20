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

app.get("/messages", (req, resp) => {
  let messages_as_text = ""

  for (const msg of messages) {
    messages_as_text = messages_as_text + msg + "\n"
  }

  resp.send(messages_as_text) 
})

// Create a new Client with the Guilds intent
const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
] })

client.on("ready", () => {
  console.log("Discord client ready")
})

client.on("messageCreate", (message) => {
  messages.push(message.content)

  if (messages.length > 5) {
    messages.shift()
  }

  console.log(messages)
})

let messages = []

// Login with the credentials stored in .env
client.login(process.env.BOT_TOKEN)
