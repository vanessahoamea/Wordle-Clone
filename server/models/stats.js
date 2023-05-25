const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true,
        unique: true
    },
    games_played: {
        type: Number,
        required: true
    },
    games_won: {
        type: Number,
        required: true
    },
    one_try: {
        type: Number,
        required: true
    },
    two_tries: {
        type: Number,
        required: true
    },
    three_tries: {
        type: Number,
        required: true
    },
    four_tries: {
        type: Number,
        required: true
    },
    five_tries: {
        type: Number,
        required: true
    },
    six_tries: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Stats", statsSchema);