import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (request, response) => {
  // response.send("Hello, Express! :)");
  response.sendFile(path.join(__dirname, "./static/index.html"));
});

app.get("/speakers", (request, response) => {
  response.sendFile(path.join(__dirname, "./static/speakers.html"));
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})