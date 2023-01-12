const express = require("express")
const app = express()
const cors = require("cors")
// const cookieParser = require("cookie-parser");

const {
    registerRouter,
    loginRouter,
    refreshTokenRouter,
} = require("./controllers/users")

const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("NA Database API is running 🥳")
})

// app.use(cookieParser());
app.use("/users/register", registerRouter)
app.use("/users/login", loginRouter)
app.use("/users/refresh_token", refreshTokenRouter)

const main = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

main()
