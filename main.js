const MySQLEvents = require("@rodrigogs/mysql-events")
const { getMapTopFive } = require("./utils")
const { sendTopOneMessage } = require("./disInteraction")
const axios = require("axios")

const MYSQL_HOST_NAME = process.env.MYSQL_HOST_NAME
const MYSQL_USER = process.env.MYSQL_HOST_NAME
const MYSQL_PASSWORD = process.env.MYSQL_HOST_NAME

const program = async () => {
    const instance = new MySQLEvents(
        {
            host: MYSQL_HOST_NAME,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
        },
        {
            startAtEnd: true,
        }
    )

    await instance.start()

    instance.addTrigger({
        name: "Map finish",
        expression: "ddrace.record_race",
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: async (event) => {
            const enteredData = event.affectedRows[0].after
            const mapTopFive = await getMapTopFive(enteredData.Map)

            if (enteredData == mapTopFive[0]) {
                sendTopOneMessage(mapTopFive)
            }
        },
    })

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error)
}

program()
    .then(() => console.log("Waiting for database vents..."))
    .catch(console.error)
