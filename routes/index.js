import express from "express";
import speakersRoute from "./speakers.js";
import feedbackRoute from "./feedback.js";

const router = express.Router();

export default (params) => {
  const { speakersService } = params;
  router.get("/", async (request, response) => {
    // if (!request.session.visitCount) {
    // request.session.visitCount = 0;  }
    request.session.visitCount += 1; // console.log(`Number of visits: ${request.session.visitCount}`);
    const topSpeakers = await speakersService.getList(); //console.log(topSpeakers);
    response.render("layout", {
      pageTitle: "Welcome",
      template: "index",
      topSpeakers,
    });
  });
  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));
  return router;
};
