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
  resp.send(message) 
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
  message = message.author.username + "|" + mess
})

let message = ""

client.login(process.env.BOT_TOKEN)
