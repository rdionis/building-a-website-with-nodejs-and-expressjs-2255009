import express from "express";

import { check, validationResult } from "express-validator";

const router = express.Router();

export default (params) => {
  const { feedbackService } = params;

  router.get("/", async (request, response) => {
    try {
      const feedback = await feedbackService.getList();
      return response.render("layout", {
        pageTitle: "Feedback",
        template: "feedback",
        feedback,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", (request, response) => {
    console.log(request.body);
    return response.send("Feedback form posted.");
  });

  return router;
};
