const express = require("express");
const crypto = require("crypto");

// Initializes Express app.
const app = express();

// Parses JSON bodies.
app.use(express.json());

// Global variable to store the x-hook-secret
// Read more about the webhook "handshake" here: https://developers.asana.com/docs/webhooks-guide#the-webhook-handshake
let secret = "";

// Local endpoint for receiving events
app.post("/receiveWebhook", (req, res) => {
  if (req.headers["x-hook-secret"]) {
    console.log("This is a new webhook");
    secret = req.headers["x-hook-secret"];

    res.setHeader("X-Hook-Secret", secret);
    res.setStatus(200);
  } 

});

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});
