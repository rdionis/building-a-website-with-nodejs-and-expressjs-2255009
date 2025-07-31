import express from "express";

const router = express.Router();

export default (params) => {
  const { speakersService } = params;

  // router.get("/", async (request, response) => {
  //   const speakers = await speakersService.getList();
  //   return response.json(speakers);
  // });

  router.get("/", async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
      const artworks = await speakersService.getAllArtwork();

      response.render("layout", {
        pageTitle: "Speakers",
        template: "speakers",
        speakers,
        artworks,
      });
    } catch (err) {
      next();
    }
  });

  router.get("/:shortname", async (request, response) => {
    try {
      const speaker = await speakersService.getSpeaker(
        request.params.shortname
      );
      const artworks = await speakersService.getArtworkForSpeaker(
        request.params.shortname
      );
      // return response.send(`Detail page of ${request.params.shortname}`);
      response.render("layout", {
        pageTitle: "Speaker's Detail",
        template: "speakers-detail",
        speaker,
        artworks,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/", (request, response) => {
    return response.send("Speakers list");
  });

  return router;
};
