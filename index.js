const express = require("express");
const Mailchimp = require("mailchimp-api-v3");
const app = express();
const PORT = 8080;

const API_KEY = "fd7f45f71924405ce0e44a7beed2c795-us21";
const AUDIENCE_ID = "e801e5fb46";
const mailchimp = new Mailchimp(API_KEY);

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send({ test: "ok" });
});

app.post("/api", async (req, res) => {
  const { email: email_address } = req.body;
  try {
    const response = await mailchimp.request({
      method: "post",
      path: `/lists/${AUDIENCE_ID}/members`,
      body: {
        email_address,
        status: "subscribed",
      },
    });
    // return response.json();
    res.status(response.statusCode).json(response.status);
  } catch (error) {
    res.status(error.status).send(error);
  }
});

app.listen(PORT, () => console.log("listening...."));
