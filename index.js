const dotenv = require('dotenv/config')
const fs = require('fs')
const { Client, GatewayIntentBits } = require('discord.js')
const express = require('express')
const basicAuth = require('express-basic-auth')

let msg = ""
let old_msg = ""

function get_messages(req, resp) {
  const sent = old_msg + "\n" + msg
  resp.send(sent) 
  return  sent 
}

function create_message(message) {
  old_msg = msg

  msg = message.author.username + "|>" + message.content.replace(new RegExp(`.{${22}}`, 'g'), '$&' + "\n")

  return msg
}


function startup () {
  const app = express ()
  app.use(express.json())

  const PORT = process.env.PORT

  app.listen(PORT, () => {
  })

  app.use(basicAuth({
    users: { "Arbor": process.env.PASSWORD }
  }))

  app.get("/messages", get_messages);

  const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] })

  client.on("ready", () => {
  })

  client.on("messageCreate", create_message);

  client.login(process.env.BOT_TOKEN)

  return client
}

const client = startup()

module.exports = { create_message, get_messages, startup, client}
