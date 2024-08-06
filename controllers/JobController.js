const { catchAsync } = require("../middlewares/CatchAsync");
const ApiError = require("../middlewares/apiError");
const Job = require("../models/jobModel");


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: {
        jobs
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


exports.createJob = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ApiError("You are not allowed to access this route ", 400));
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ApiError("please provide full job deatils", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ApiError("Please either provide fixed salary or ranged salary.", 400)
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ApiError("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy: req.user._id,
  });

  await job.save();

  res.status(200).json({
    status: "success",
    message: "job Posted Successfully",
    job,
  });
});

exports.getMyJobs = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ApiError("You are not allowed to access this route ", 400));
  }
  const MyJobs= await Job.find({postedBy:req.user._id})
  res.status(200).json({ 
    status:"success", 
    length:MyJobs.length,
    data:MyJobs
  })
});

exports.updateJob = catchAsync(async(req,res,next)=>{ 
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(new ApiError("You are not allowed to access this route ", 400));
    }
    const {id} = req.params ; 
    let job = await Job.findById(id) ; 
    if(!job){ 
        return next(new ApiError('OOPS! jOB NOT Found with this id',404));
    }
    if (req.user._id.toString() !== job.postedBy.toString()) {
        return next(new ApiError('You are not allowed to access this route', 403));
    }

    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true, 
        useFindAndModify:true
    }); 
    res.status(200).json({ 
        status:'success', 
        message:"Job updated",
        job
    })
})

exports.DeleteJob = catchAsync(async(req,res,next)=>{ 
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(new ApiError("You are not allowed to access this route ", 400));
    }
    const {id} = req.params ; 
    let job = await Job.findById(id) ; 
    if(!job){ 
        return next(new ApiError('OOPS! jOB NOT Found with this id',404));
    }
    await job.deleteOne(); 
    
    res.status(201).json({
        status:'success',
        message: 'Job is deleted'
    })
})



exports.GetSingleJob = catchAsync(async(req,res,next)=>{ 
  const {id} = req.params ; 
  const job = await Job.findById(id); 
  if(!job){ 
    return next ( new ApiError("Job Not Found",404))
  }
  res.status(200).json({ 
    status:'success', 
    job
  })
})