import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieSession from "cookie-session";
import createError from "http-errors";
import bodyParser from "body-parser";
import FeedbackService from "./services/FeedbackService.js";
import SpeakersService from "./services/SpeakerService.js";

import routes from "./routes/index.js";

const app = express();

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json");

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["gHsdkfjwki", "aklfjakfakhjf"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static"))); //  express.static is middleware

// app.get("/throw", (request, response, next) => {
//   setTimeout(() => {
//     next(new Error("Throwing new error!!!"));
//     //throw new Error("Throwing new error!!!");
//   }, 500);
// });

// app.get("/", (request, response) => {
//   // response.send("Hello, Express! :)");
//   // response.sendFile(path.join(__dirname, "./static/index.html"));
//   response.render("pages/index", { pageTitle: "Welcome" });
// });

// app.get("/speakers", (request, response) => {
//   response.sendFile(path.join(__dirname, "./static/speakers.html"));
// });

app.locals.siteName = "ROUX Meetups";

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    next();
  } catch (err) {
    next(err);
  }
});

app.use(
  "/",
  routes({
    feedbackService,
    speakersService,
  })
);

app.use((request, response, next) => {
  next(createError(404, "File not found"));
});

// error handling middleware // takes four arguments
app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render("error");
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
