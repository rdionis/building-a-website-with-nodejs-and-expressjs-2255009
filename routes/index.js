import express from "express";
import speakersRoute from "./speakers.js";
import feedbackRoute from "./feedback.js";

const router = express.Router();

export default (params) => {
  const { speakersService } = params;
  router.get("/", async (request, response, next) => {
    // if (!request.session.visitCount) {
    // request.session.visitCount = 0;  }
    // request.session.visitCount += 1;
    // console.log(`Number of visits: ${request.session.visitCount}`);
    // return next(new Error("Some error"));

    try {
      const artworks = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render("layout", {
        pageTitle: "Welcome",
        template: "index",
        topSpeakers,
        artworks,
      });
    } catch (err) {
      next(err);
    }
  });
  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));
  return router;
};
