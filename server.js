const app = require("./app");

const cloudInary = require("cloudinary");

cloudInary.v2.config({ 
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME, 
    api_key:process.env.CLOUDINARY_CLIENT_API, 
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
