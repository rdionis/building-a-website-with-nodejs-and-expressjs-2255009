import express from "express";

const router = express.Router();

export default (params) => {
  const { feedbackService } = params;

  router.get("/", async (request, response) => {
    const feedback = await feedbackService.getList();
    return response.send(feedback);
  });

  router.post("/", (request, response) => {
    return response.send("Feedback form posted.");
  });

  return router;
};
