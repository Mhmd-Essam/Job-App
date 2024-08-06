const { catchAsync } = require("../middlewares/CatchAsync");
const ApiError = require('../middlewares/apiError');
const User = require("../models/UserModel");
const {sendToken}=require("../utils/jwtToken")
const bcrypt = require('bcrypt');


exports.register = catchAsync(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ApiError("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ApiError("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

exports.Login=catchAsync(async(req,res,next)=>{
  const {role} = req.body ;
  const user = await User.findOne({email:req.body.email}); 
  if(!user|| ! await bcrypt.compare(req.body.password,user.password)){ 
    return next(new ApiError("incorrect email or password", 401))
  }
  if(!role){ 
    return next(new ApiError("please enter your role ",404))
  }
  if(user.role !== role){ 
    return next(new ApiError(" User with this role not found  ",400))
  }
  sendToken(user,200,res,"you logged in successfuly")
})



exports.logout=catchAsync(async(req,res,next)=>{ 
  res.status(201).cookie("token","",{
    httpOnly: true , 
    expires:new Date(Date.now()),
  }).json({
    status:'success', 
    message:'User Logged out successfully!'
  }); 

})


exports.getUser =catchAsync(async(req,res,next)=>{ 
  const user =req.user ; 
  res.status(200).json({ 
    success:true,
    status:'success',
    data:user
  }) 
})