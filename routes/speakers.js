import express from "express";

const router = express.Router();

export default (params) => {
  const { speakersService } = params;

  // router.get("/", async (request, response) => {
  //   const speakers = await speakersService.getList();
  //   return response.json(speakers);
  // });

  router.get("/", async (request, response) => {
    const speakers = await speakersService.getList();
    response.render("layout", {
      pageTitle: "Speakers",
      template: "speakers",
      speakers,
    });
  });

  router.get("/:shortname", async (request, response) => {
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    const artworks = await speakersService.getArtworkForSpeaker(
      request.params.shortname
    );
    //console.log("This is the current speaker", speaker);
    console.log("This is the artwork:", artworks);
    // return response.send(`Detail page of ${request.params.shortname}`);
    response.render("layout", {
      pageTitle: "Speaker's Detail",
      template: "speakers-detail",
      speaker,
      artworks,
    });
  });

  router.get("/", (request, response) => {
    return response.send("Speakers list");
  });

  return router;
};
