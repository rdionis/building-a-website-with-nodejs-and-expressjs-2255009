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

  router.get("/:shortname", (request, response) => {
    return response.send(`Detail page of ${request.params.shortname}`);
  });

  router.get("/", (request, response) => {
    return response.send("Speakers list");
  });

  return router;
};
