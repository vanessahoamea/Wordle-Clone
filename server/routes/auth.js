const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const User = require("../models/auth");

const router = express.Router();
router.use(cors());
env.config();

router.post("/login", async (req, res) => {
    const user = {
        email: req.body.email.trim().toLowerCase(),
        password: req.body.password
    };

    if(user.email == undefined || user.password == undefined)
    {
        res.status(400);
        res.send({"message": "E-mail and password are required."});
        return;
    }

    try {
        const data = await User.findOne(user);
        if(data == null)
        {
            res.status(401);
            res.send({"message": "E-mail or password is incorrect."});
            return;
        }

        const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY);
        res.send({"jwt": token});
    } catch(e) {
        res.status(500);
        res.send({"message": "Something went wrong."});
    }
});

router.post("/register", async (req, res) => {
    const user = new User({
        email: req.body.email.trim().toLowerCase(),
        password: req.body.password
    });

    if(user.email == "" || user.password == "")
    {
        res.status(400);
        res.send({"message": "E-mail and password are required."});
        return;
    }

    try {
        const data = await User.findOne({"email": user.email});
        if(data != null)
        {
            res.status(409);
            res.send({"message": "E-mail is already taken."});
            return;
        }

        await user.save();
        res.status(201);
        res.send({"message": "Account created."});
    } catch(e) {
        res.status(500);
        res.send({"message": "Something went wrong."});
    }
});

module.exports = router;