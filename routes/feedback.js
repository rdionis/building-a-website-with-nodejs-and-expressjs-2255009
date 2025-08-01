import express from "express";

import { check, validationResult } from "express-validator";

const router = express.Router();

export default params => {
  const { feedbackService } = params;

  router.get("/", async (request, response) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;

      const successMessage = request.session.feedback
        ? request.session.feedback.message
        : false;

      request.session.feedback = [];

      response.render("layout", {
        pageTitle: "Feedback",
        template: "feedback",
        feedback,
        errors,
        successMessage,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    [
      check("name")
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("A name is required."),
      check("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email adress is required."),
      check("title")
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("A title is required."),
      check("message")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("A message is required."),
    ],
    async (request, response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect("/feedback");
      }

      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: "Thank you for your feedback!",
      };
      // return response.send("Feedback form posted.");
      return response.redirect("/feedback");
    }
  );

  return router;
};
