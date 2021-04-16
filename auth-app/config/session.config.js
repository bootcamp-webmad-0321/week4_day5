const session = require("express-session");
const MongoStore = require("connect-mongo")(session)
const mongoose = require('mongoose')

module.exports = app => {
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET,
        cookie: { maxAge: 60000 },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 24 * 60 * 60
        })
    }))
}