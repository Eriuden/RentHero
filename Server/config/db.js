const mongoose = require("mongoose")

mongoose
    .connect(
        "mongodb+srv//" +
            process.env.DB_USER_PASS +
            "@cluster0.iodcc.mongodb.net/RentHero"
    )
    .then(() => console.log("mongoDB recoit 5 sur 5"))
    .catch((err) => console.log("mongoDB n'est pas connecté", err))