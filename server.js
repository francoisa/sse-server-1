const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const getData = require("./services/datasource");

const app = express();

app.use(express.json());

var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  res.flushHeaders();

  let eventInterval = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(getData())}\n\n`);
  }, 2000);

  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
