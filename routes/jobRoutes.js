const express = require("express");
const {createJob,getAllJobs,getMyJobs,updateJob,DeleteJob,GetSingleJob} = require("./../controllers/JobController");
const {isAuthorized}=require("./../middlewares/auth") 
const router = express.Router();


router.get("/getall", getAllJobs);
router.post("/post", isAuthorized,createJob);
router.get("/getmyjobs", isAuthorized,getMyJobs);
router.put("/update/:id", isAuthorized,updateJob);
router.delete("/delete/:id", isAuthorized,DeleteJob);
router.get("/:id", isAuthorized,GetSingleJob);



module.exports = router;

