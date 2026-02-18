import { Router } from "express";
import authenticationMiddleware from "../Middlewares/authenticationMiddleware";
// import upload from "../Middlewares/uploadMiddleware";
const JobController = require("../Controllers/jobController");

const router = Router();

router.get("/:id",
    // authenticationMiddleware,
    JobController.getJobs);
router.get("/viewOne/:id",
    // authenticationMiddleware,
    JobController.getOneJob);
router.post(
    "/",
    // authenticationMiddleware,
    JobController.postJob
);
router.put("/:id",
    // authenticationMiddleware,
    JobController.editJob);
router.delete("/:id",
    // authenticationMiddleware,
    JobController.deleteJob);

export default router;
