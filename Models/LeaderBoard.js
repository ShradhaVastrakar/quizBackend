const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema({
    email: { type: String, required: true },
    score: { type: Number, required: true }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema)

module.exports = {
    Leaderboard
}