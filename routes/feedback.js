import e from "express";
import express from "express";

import { check, validationResult } from "express-validator";

const router = express.Router();

const validations = [
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
];

export default params => {
  const { feedbackService } = params;

  router.get("/", async (request, response) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback
        ? request.session.feedback.errors
        : false;

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

  router.post("/", validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect("/feedback");
      }
    } catch (error) {
      next(error);
    }

    const { name, email, title, message } = request.body;
    await feedbackService.addEntry(name, email, title, message);
    request.session.feedback = {
      message: "Thank you for your feedback!",
    };
    // return response.send("Feedback form posted.");
    return response.redirect("/feedback");
  });

  router.post("/api", validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }
      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
