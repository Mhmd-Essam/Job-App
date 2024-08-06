const { catchAsync } = require("../middlewares/CatchAsync");
const ApiError = require("../middlewares/apiError");
const App = require("./../models/applicationModel");
const cloudinary = require("cloudinary");
const Job = require("./../models/jobModel");

exports.postApplication = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ApiError("You are not allowed to access this route", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ApiError("Resume File Required!", 400));
  }

  const { resume } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ApiError("Invalid File Type . please upload a PNG file", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "UNknown cloudinary Eror"
    );
    return next(new ApiError("Faild to Upload Resume To Cloudinary ", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ApiError("Job not found ", 404));
  }
  const JobDetails = await Job.findById(jobId);
  if (!JobDetails) {
    return next(new ApiError("job not found", 404));
  }
  const employerID = {
    user: JobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const jobname = JobDetails.title ;  

  const application = await App.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
    jobname
  });
});

exports.employerGetAllApplications = catchAsync(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await App.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
exports.jobseekerGetApplications = catchAsync(async(req,res,next)=>{ 
  const {role} = req.user ; 
  if(role==="Employer"){ 
    return NaN(new ApiError("Employer not allowed tp access this resource", 400))
  }
  const {_id} = req.user ; 
  const applications = await App.find({ "applicantID.user": _id });
  res.status(200).json({ 
    status:"success", 
    applications
  });
});

exports.jobseekerDeleteApplication = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ApiError("Employer not allowed tp access this resource", 400)
    );
  }
  const { id } = req.params;
  const application = await App.findById(id);
  if (!application) {
    return next(new ApiError("Application Not Found", 404));
  }
  await application.deleteOne();
  res.status(200).json({
    status: "success",
    message: "Application Deleted",
  });
});
