import { Router } from "express";
import authenticationMiddleware from "../Middlewares/authenticationMiddleware";
// import upload from "../Middlewares/uploadMiddleware";
const AuthController = require("../Controllers/authController");

const router = Router();

router.post("/signup", AuthController.postSignup);
router.post("/login", AuthController.postLogin);
router.post("/account-setup", AuthController.accountSetup);
router.post("/logout",AuthController.logout);

export default router;
