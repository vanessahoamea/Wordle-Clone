const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const statsRouter = require("./routes/stats");

const app = express();
app.use(express.json())
app.use("/auth", authRouter);
app.use("/stats", statsRouter);
app.use(cors());

mongoose.connect("mongodb://127.0.0.1/wordle");

app.get("/", (_, res) => {
    res.send({ "message": "Welcome to the API!" });
});

app.get("/word", (_, res) => {
    fetch("https://random-word-api.vercel.app/api?words=1&length=5")
    .then(resp => {
        if(resp.ok)
            return resp.json();
        return resp.json().then(_ => { throw new Error() });
    })
    .then(resp => res.send({"word": resp[0]}))
    .catch(_ => res.send({"word": "debug"}));
});

app.listen(5000);