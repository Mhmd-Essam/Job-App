const express = require("express");
const {
  postApplication,
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetApplications,
} = require("./../controllers/applicationController");

const {isAuthorized}=require("./../middlewares/auth") 

const router = express.Router();


router.post("/post", isAuthorized, postApplication);
router.get("/employer/getall", isAuthorized,employerGetAllApplications );
router.get("/jobseeker/getall", isAuthorized, jobseekerGetApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);

module.exports = router;
