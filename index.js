// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const CHANNEL_ID = process.env.CHANNEL_ID

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
    const channel = client.channels.cache.get(CHANNEL_ID)
    channel.send("Hello")
})

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN)
