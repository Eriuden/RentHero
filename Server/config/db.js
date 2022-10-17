const mongoose = require("mongoose")

mongoose
    .connect(
        "mongodb+srv//" +
            process.env.DB_USER_PASS +
            "JustForMe"
    )
    .then(() => console.log("mongoDB recoit 5 sur 5"))
    .catch((err) => console.log("mongoDB n'est pas connecté", err))
