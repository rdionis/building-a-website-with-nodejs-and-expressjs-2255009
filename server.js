import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieSession from "cookie-session";
import routes from "./routes/index.js";
import FeedbackService from "./services/FeedbackService.js";
import SpeakersService from "./services/SpeakerService.js";

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static"))); //  express.static is middleware

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
    // console.log(response.locals);
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  "/",
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
