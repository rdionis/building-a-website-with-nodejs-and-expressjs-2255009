import express from "express";
import speakersRoute from "./speakers.js";
import feedbackRoute from "./feedback.js";

const router = express.Router();

export default (params) => {
  router.get("/", (request, response) => {
    response.render("pages/index", { pageTitle: "Welcome" });
  });

  router.use("/speakers", speakersRoute(params));

  router.use("/feedback", feedbackRoute(params));

  return router;
};
