const express = require("express");
const router = express.Router();
const syncUsersFunction = require("../middleware/sync.js");


router.post("/", async (req, res) => {
    try{
        await syncUsersFunction();
        res.status(200).send("Users successfully synced");
    } catch (error) {
        console.error("Failed to sync users: ", error);
        res.status(500).send("Error syncing users");
    }
});

module.exports = router;