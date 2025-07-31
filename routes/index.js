import express from "express";
import speakersRoute from "./speakers.js";
import feedbackRoute from "./feedback.js";

const router = express.Router();

export default (params) => {
  router.get("/", (request, response) => {
    // if (!request.session.visitCount) {
    //   request.session.visitCount = 0;
    // }
    // request.session.visitCount += 1;
    // console.log(`Number of visits: ${request.session.visitCount}`);

    response.render("layout", { pageTitle: "Welcome", template: "index" });
  });

  router.use("/speakers", speakersRoute(params));

  router.use("/feedback", feedbackRoute(params));

  return router;
};
