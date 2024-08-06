const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { dbconnection } = require("./database/database");
const userRoute = require("./routes/userRoutes");
const AppRoute = require("./routes/applicitonRoutes");
const JObRoute = require("./routes/jobRoutes");
const morgan = require("morgan");
const errorMiddleware= require("./middlewares/errormidleware");

dotenv.config({ path: "./config.env" });

const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', process.env.FRONTEND_URL];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "UPDATE", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}💪`);
}

app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


dbconnection();
app.use("/api/v1/user", userRoute);
app.use("/api/v1/application", AppRoute);
app.use("/api/v1/job", JObRoute);

app.use(errorMiddleware);


module.exports = app;
