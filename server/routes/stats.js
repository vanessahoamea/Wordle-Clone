const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const Stats = require("../models/stats");

const router = express.Router();
router.use(cors());
env.config();

router.post("/", async (req, res) => {
    const token = req.headers.authorization;
    if(token == undefined)
    {
        res.status(400);
        res.send({"message": "Bearer token is required."});
        return;
    }

    try {
        const decoded = jwt.verify(token.split("Bearer ")[1], process.env.SECRET_KEY);
        const userId = decoded.id;
        const userStats = new Stats({
            user_id: userId, games_played: 0, games_won: 0,
            one_try: 0, two_tries: 0, three_tries: 0,
            four_tries: 0, five_tries: 0, six_tries: 0
        });

        try {
            let data = await Stats.findOne({user_id: userId});
            if(data == null)
            {
                await userStats.save();
                res.send(userStats);
                return;
            }
            
            const tries = req.body.turn == 1 ? "one_try" : req.body.turn == 2 ? "two_tries" 
                        : req.body.turn == 3 ? "three_tries" : req.body.turn == 4 ? "four_tries"
                        : req.body.turn == 5 ? "five_tries" : "six_tries";
            if(req.body.game_over == 1)
            {
                data[tries]++;
                data.games_won++;
            }
            data.games_played++;
            await data.save();

            res.send(data);
        } catch(e) {
            res.status(500);
            res.send({"message": "Something went wrong."});
        }
    } catch(e) {
        res.status(401);
        res.send("Bearer token is not valid.");
    }
});

router.get("/", async (req, res) => {
    const token = req.headers.authorization;
    if(token == undefined)
    {
        res.status(400);
        res.send({"message": "Bearer token is required."});
        return;
    }

    try {
        const decoded = jwt.verify(token.split("Bearer ")[1], process.env.SECRET_KEY);
        const userId = decoded.id;
        const userStats = new Stats({
            user_id: userId, games_played: 0, games_won: 0,
            one_try: 0, two_tries: 0, three_tries: 0,
            four_tries: 0, five_tries: 0, six_tries: 0
        });

        try {
            const data = await Stats.findOne({user_id: userId});
            if(data == null)
            {
                await userStats.save();
                res.send(userStats);
                return;
            }

            res.send(data);
        } catch(e) {
            res.status(500);
            res.send({"message": "Something went wrong."});
        }
    } catch(e) {
        res.status(401);
        res.send("Bearer token is not valid.");
    }
});

module.exports = router;