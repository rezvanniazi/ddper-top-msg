// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const CHANNEL_ID = process.env.CHANNEL_ID

function sendTopOneMessage(mapTopFive) {
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds] })

    // When the client is ready, run this code (only once)
    // We use 'c' for the event parameter to keep it separate from the already defined 'client'
    client.once(Events.ClientReady, (c) => {
        const channel = client.channels.cache.get(CHANNEL_ID)
        channel.send(`${mapTopFive[0]} tope ${mapTopFive[1]} ro zad`)
    })

    // Log in to Discord with your client's token
    client.login(DISCORD_TOKEN)
}

module.exports = { sendTopOneMessage }
