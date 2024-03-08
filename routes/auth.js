/*
 * Express router configuration for handling authentication routes.
 *
 * Imports GET and POST handlers from AuthController for user registration and login.
 *
 * GET routes:
 *   - /register: Route for rendering registration form.
 *   - /login: Route for rendering login form.
 *
 * POST routes:
 *   - /register: Route for submitting registration data.
 *   - /login: Route for submitting login data.
 */
const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

// HTTP METHOD: - GET
router.get("/register", AuthController.GET.register);
router.get("/login", AuthController.GET.login);

// HTTP METHOD: - POST
router.post(
    "/register",
    AuthMiddleware.POST.register,
    AuthController.POST.register,
);
router.post("/login", AuthController.POST.login);

module.exports = router;
