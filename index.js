const dotenv = require('dotenv/config')
const fs = require('fs')
const { Client, GatewayIntentBits } = require('discord.js')

// Create a new Client with the Guilds intent
const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
] })

client.on("ready", () => {
  console.log("I am ready!")
})

client.on("messageCreate", (message) => {
  console.log(message.content)
})
// Login with the credentials stored in .env
client.login(process.env.BOT_TOKEN)
