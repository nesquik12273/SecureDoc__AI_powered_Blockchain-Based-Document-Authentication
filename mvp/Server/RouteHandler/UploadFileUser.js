const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ObjectId } = mongoose.Types;
const fs = require('fs-extra')
const UpoladSchema = require("../Scheema/UploadFIleUser");
const UserUpload= new mongoose.model("UploadFileUser", UpoladSchema);
const CheakLoginControler = require('../MiddleWears/CheakLoginControler');
const fileUpload = require('express-fileupload')
const Uploadss=  express.static('Uploads');
router.post("/UserReport", CheakLoginControler, fileUpload(), async (req, res) => {
  const file = req.files.File;
  const { name, username, date,CourseStart,CourseEnd,CourseName } = req.body;
console.log(req.body)
  const filepath = `${__dirname}/../UploadsTestReport/${file.name}`;
  file.mv(filepath, async (err) => {
      try {
          const newImg = fs.readFileSync(filepath);
          const encImg = newImg.toString('base64');
          const Img = Buffer.from(encImg, 'base64');

          const TestReport = new UserUpload({
              name,
              username,
              img: Img,
              CourseStart,
              CourseEnd,
              CourseName,
              date,
          });

          await TestReport.save();
          return res.status(200).json({ msg: "File Upload Successfully" });
      } catch (err) {
          return res.status(500).json({ msg: 'Failed to upload image' });
      }
  });
});


 router.get("/ReportPost",async(req,res)=>{
  try {  
      const user = await UserUpload.find({name: req.query.username});

      // console.log(user)
      if(user&&user.length>0){
          res.send(user)
      }
      
  } catch (error) {
      res.status(500).json({
          "error": "Something Is Wrong Please Try Again"
      }); 
  }

   
})
router.get("/VerifyReportPost",async(req,res)=>{
  try {  
  
    const user = await UserUpload.find({});

      // console.log(user)
      if(user&&user.length>0){
          res.send(user)
      }
      
  } catch (error) {
      res.status(500).json({
          "error": "Something Is Wrong Please Try Again"
      }); 
  }

   
})

router.get("/UploadReportPost",CheakLoginControler,async(req,res)=>{
  try {  
  
    const user = await UserUpload.find({name: req.query.username});

      // console.log(user)
      if(user&&user.length>0){
          res.send(user)
      }
      
  } catch (error) {
      res.status(500).json({
          "error": "Something Is Wrong Please Try Again"
      }); 
  }

   
})
router.get("/ReportImg",async(req,res)=>{
 
  try {  
      const user = await UserUpload.find({_id: ObjectId(req.query.id)});
     
      if(user&&user.length>0){
          res.send(user)
      }
      
  } catch (error) {
      res.status(200).json({
        "error": "Something Is Wrong Please Try Again"
      }); 
  }

   
})
router.delete('/delete/:id',async(req,res)=>{
  
  UserUpload.deleteOne({_id: req.params.id},
      (err) => {
          if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
            
              message: "Delete SUccessfully",
            });
          }
        }
      )
})


module.exports = router;