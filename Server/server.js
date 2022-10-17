const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const usersRoutes = require("./routes/users.routes")
const missionsRoutes = require("./routes/missions.routes")
require("dotenv").config({ path: "./config/.env"})
const {requireAuth, checkUser} = require("./middleware/auth.middleware")
require("./config/db")
const cors = require("cors")
const app = express()

app.use(cors({ origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.use(cookieParser())

//jwt
app.get("*",checkUser)
app.get("/jwtid", requireAuth, (req,res) => {
    res.status(200).send(res.locals.user_id)
})

//routes
app.use("/api/users", usersRoutes)
app.use("/api/missions", missionsRoutes)

//launch server

app.listen(process.env.PORT, () => {
    console.log(`Je suis sur le port ${process.env.PORT}`)
})