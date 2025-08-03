// const HttpError = require("../models/http-error");
// const bcrypt = require("bcryptjs");
// const User = require("../models/user-schema");
// const jwt = require("jsonwebtoken");
// const accesscontrol = require("../models/accessControl-schema");
// const userdetail = require("../models/userDetail-schema");
// const { default: mongoose } = require("mongoose");
// const cryptography = require("../models/Cryptography");
// const StudentAcademic = require("../models/Academics/student-academics-schema");
// const Academic = require("../models/Academics/academics-schema");
// const Semester = require("../models/Course/semester-schema");
// const Courses = require("../models/Course/courses-schema");
// // const studentAcademic= require("../models/Academics/student-academics-schema")

// const getRole = async (req, res, next) => {
//   const rolereq = req.query.role;
//   try {
//     const role = await accesscontrol.find({ role: rolereq });
//     //console.log(user);
//     let data = role.map(async (val) => {
//       let username = await User.findById(val.user);
//       return {
//         id: val._id,
//         role: val.rolename,
//         user: val.user,
//         name: username.name,
//       };
//     });
//     return res.status(200).send(data);
//   } catch (err) {
//     return res.status(400).send({ message: "Error while Parsing the data" });
//   }
// };

// const getAcademicDetails = async (user) => {
//   var academics;
//   if (user === "student") {
//     academics = await StudentAcademic.find({});
//   } else if (user === "faculty") {
//     academics = await Academic.find({});
//   }
//   return academics;
// };

// const getAcademicWithRole = async (req, res, next) => {
//   console.log("///////////////////////////////////////");
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Not Authorized to perform the action");
//   }
//   const rolereq = req.query.rolename;
//   //console.log(rolereq);
//   try {
//     const role = await accesscontrol.find({ rolename: rolereq });
//     const user = await User.find({});

//     if (user.length > 0 && role.length > 0) {
//       console.log(role);
//       console.log(user);
//       const academics = await getAcademicDetails(req.query.rolename);
//       console.log(academics);
//       let data = role.map((val) => {
//         let username = user.filter((userval) => {
//           let valID = userval._id;
//           let userId = val.user;
//           //console.log(userval._id + "  " + val.user + "   ");
//           if (valID.equals(userId)) {
//             return true;
//           } else {
//             return false;
//           }
//         });
//         //console.log(username);
//         let checkAcademic = [];
//         //console.log("Inside Loop//////////////////////////////////////");
//         //console.log(academics);
//         if (academics.length > 0) {
//           checkAcademic = academics.filter((acaval) => {
//             //console.log(val.academic + "  " + acaval._id + "   ");
//             if (val.academic) {
//               if (val.academic.equals(acaval._id)) {
//                 return true;
//               }
//             }
//             return false;
//           });
//         }

//         console.log(username);

//         if (username.length > 0) {
//           return {
//             id: val._id,
//             role: val.rolename,
//             academic: checkAcademic.length > 0 ? checkAcademic[0].course : "",
//             year: checkAcademic.length > 0 ? checkAcademic[0].year : "",
//             name: username[0].name,
//             regno: username[0].uid,
//             userid: username[0]._id,
//           };
//         } else {
//         }
//       });
//       data = data.filter((val) => {
//         if (val) {
//           return true;
//         }
//         return false;
//       });
//       console.log(data);
//       if (data.length > 0) {
//         return res.status(200).send(data);
//       } else {
//         return res.status(400).send({ message: "No Data Found" });
//       }
//     } else {
//       return res.status(400).send({ message: "No Data Found" });
//     }
//   } catch (err) {
//     return res.status(400).send({ message: "Error while Parsing the data" });
//   }
// };

// const addAcademic = async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Not Authorized to perform the action");
//   }
//   const data = req.body;
//   try {
//     console.log(data);
//     var role = await accesscontrol.findById(data.id);
//     // const semester = await Semester.find({ course: data.course });
//     if (role) {
//       if (data.role === "student") {
//         //console.log(role);
//         if (role.academic) {
//           //console.log("Academic is present");
//           return res
//             .status(200)
//             .send({ message: "User Already Assigned to Course Successfully " });
//         } else {
//           //console.log("Academic is not present");
//           var academic = new StudentAcademic({
//             year: data.year,
//             student: data.userid, //user assignes here for Academics
//             course: data.academic,
//           });
//           //console.log(academic);
//           const session = await mongoose.startSession();
//           session.startTransaction();
//           //console.log("session started");
//           await academic.save();
//           role.academic = academic._id;
//           await role.save();
//           //console.log("role started");
//           await session.commitTransaction();
//           //console.log("session committed");
//           return res
//             .status(200)
//             .send({ message: "User Assigned to Course Successfully " });
//         }
//       } else if (data.role === "faculty") {
//         console.log(data);
//         if (role.academic) {
//           //console.log("Academic is present");
//           return res
//             .status(200)
//             .send({ message: "User Already Assigned to Course Successfully " });
//         } else {
//           //console.log("Academic is not present");
//           var academic = new Academic({
//             year: data.year,
//             faculty: data.userid, //user assignes here for Academics
//             course: data.academic,
//           });
//           console.log(academic);
//           const session = await mongoose.startSession();
//           session.startTransaction();
//           console.log("session started");
//           await academic.save({ session: session });
//           role.academic = academic._id;
//           await role.save({ session: session });
//           //console.log("role started");
//           await session.commitTransaction();
//           //console.log("session committed");
//           return res
//             .status(200)
//             .send({ message: "User Assigned to Course Successfully " });
//         }
//       }
//     }
//   } catch (err) {
//     res.status(404).send({ message: "Unknown Network Error" });
//   }
// };

// const deletUser = async (req, res, next) => {
//   //console.log(req.body.id);
//   const reqId = req.body.id;
//   if (req.user.role === "admin") {
//     console.log(req.user);
//   }
//   // const userRole=getUserRole(reqUserId)
//   // if(userRole==null||userRole==undefined){
//   //     return next( new HttpError('Unable to identify the user'),404);
//   // }
//   // else if(userRole.rolename!=="admin"||userRole.rolename!=="administartion"){
//   //     return next( new HttpError('Dont have enough priveliage'),404);
//   // }
//   const user = await User.findById(reqId);
//   if (user) {
//     // //console.log("Usersshjsbjhfsxcbzjhbcd",user);
//     try {
//       const session = await mongoose.startSession();
//       session.startTransaction();
//       //console.log("session started");
//       await userDetailSchema.findByIdAndDelete(user.moreDetail);
//       //console.log("user started");
//       await roleSchema.findByIdAndDelete(user.role);
//       //console.log("role started");
//       await session.commitTransaction();
//       //console.log("session committed");
//       return res.status(200).send({ message: "User Deleted Success fully" });
//     } catch (err) {
//       return res.status(404).send({ message: "Unable to Delete the request" });
//     }
//   }
// };

// const updateUserStatus = async (req, res, next) => {
//   //console.log(req.body);
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Not Authorized to perform the action");
//   }
//   try {
//     const user = await User.findById(req.body.data.id);
//     //console.log(user);
//     user.status = req.body.data.status;
//     await user.save();
//     return res.status(200).send({ message: "UserStatus Updated successfully" });
//   } catch (err) {
//     //console.log(err);
//     return res.status(404).send({ message: "Error while Parsing the data" });
//   }

//   // }).catch((err)=>{

//   // })
//   // res.status(404).send({message:"Unable to find the user"});
// };

// const getAllUser = async (req, res, next) => {
//   console.log("At get All user");
//   console.log(req.user);
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Not Authorized to perform the action");
//   }
//   console.log(req.user);
//   //console.log(req.body);
//   const reqUserId = req.query.id;
//   // const userRole = await getUserRole(reqUserId);
//   // if(userRole==null||userRole==undefined){
//   //     //console.log("USer is undefined")
//   //     return next( new HttpError('Unable to identify the user'),404);
//   // }
//   // else if(userRole.rolename!="admin"&&userRole.rolename!="administartion"){
//   //     //console.log(userRole.rolename!="admin")
//   //     return next( new HttpError('Dont have enough priveliage'),404);
//   // }
//   const user = await User.find({});

//   var respData = user.map((val) => {
//     return {
//       uid: val.uid,
//       id: val._id,
//       name: val.name,
//       status: val.status,
//     };
//   });
//   return res.status(200).send(respData);
// };

// const doLogin = async (req, res, next) => {
//   console.log("At doLogin");
//   console.log(req.query.uid);

//   const user = await User.find({ uid: req.query.uid });
//   ////console.log(req.query.uid);
//   // if(user.length>0){
//   //     await User.findByIdAndDelete(user[0]._id).then(response=>{
//   //         ////console.log("UserDeleted");
//   //         res.status(200).json({message:"signed sucessfully"});
//   //     })

//   // }
//   // ////console.log(req)

//   if (user.length > 0) {
//     if (
//       true
//       // (await cryptography.decryptData(req.query.password, req.query.uid)) ==
//       // (await cryptography.decryptData(user[0].password, user[0].uid))
//     ) {
//       ////console.log("User ",user);
//       let newRole = await accesscontrol.find({ user: user[0]._id });
//       if (newRole.length > 0) {
//         ////console.log("Role ",newRole)
//         let response = {
//           id: user[0]._id,
//           name: user[0].name,
//           role: newRole[0].rolename,
//         };
//         const accessToken = jwt.sign(response, process.env.ACCESSTOKEN, {
//           expiresIn: "15m",
//         });
//         const refreshToken = jwt.sign(response, process.env.REFRESHTOKEN, {
//           expiresIn: "5h",
//         });
//         res.cookie("jwt", refreshToken, {
//           httpOnly: true,
//           secure: true,
//           maxAge: 1000 * 60 * 60 * 3,
//           sameSite: "None",
//         });
//         return res.status(200).json({
//           message: "signed sucessfully",
//           ...response,
//           token: accessToken,
//         });
//       } else {
//         return next(new HttpError("Error in finding the user"), 404);
//       }
//     } else {
//       return next(new HttpError("Incorrect Password"), 404);
//     }
//   } else {
//     return next(new HttpError("User Cannot Be found"), 404);
//   }

//   // if(user.length<1){
//   //     return next( new HttpError('User Cannot Be found'),404);
//   // }
//   // else {
//   //     ////console.log("Checking password",await cryptography.decryptData( req.query.password,req.query.uid),"  ",await cryptography.decryptData(user[0].password,user[0].uid))
//   //     if(await cryptography.decryptData( req.query.password,req.query.uid)!=await cryptography.decryptData(user[0].password,user[0].uid)){
//   //     return next( new HttpError('Incorrect Password'),404);
//   //     }
//   // }
//   // await accesscontrol.find({_id:user.role}).then((res)=>{
//   //     ////console.log("User ",user);
//   // ////console.log("Role ",res)
//   // let response={
//   //     id:user._id,
//   //     name:user.name,

//   //     };
//   // ////console.log("response",response)
//   //     return  res.status(200).json({message:"signed sucessfully",...response});
//   // })
// };

// const createUser = async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Not Authorized to perform the action");
//   }
//   /**
//    *
//    * Need to write code to encryption and ddecription of the code.
//    */
//   ////console.log(req.body)

//   function isValidEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   }

//   // Helper function to validate mobile number
//   function isValidMobileNumber(mobileNumber) {
//     const regex = /^\d{10}$/;
//     return regex.test(mobileNumber);
//   }
//   //console.log(req.body);
//   const cardid = req.body.cardid;
//   const profilePhoto = req.body.profilePhoto;
//   const role = req.body.role;
//   const userID = req.body.uid;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const gender = req.body.gender;
//   const dob = req.body.dob;
//   const email = req.body.email;
//   const mobileNo = req.body.mobileNo;
//   const address = req.body.address;
//   let password = req.body.password;

//   // Perform validation checks
//   const errors = [];

//   if (!cardid || typeof cardid !== "string" || cardid.length < 4) {
//     errors.push(
//       "Card ID is required and must be a string with a maximum length of 5 characters."
//     );
//   }

//   if (!profilePhoto || typeof profilePhoto !== "string") {
//     errors.push("Profile photo is required and must be a string.");
//   }

//   if (!role || typeof role !== "string") {
//     errors.push("Role is required and must be a string.");
//   }

//   if (!userID || typeof userID !== "string" || userID.length < 9) {
//     errors.push(
//       "User ID is required and must be a string with a maximum length of 50 characters."
//     );
//   }

//   if (!firstName || typeof firstName !== "string" || firstName.length < 2) {
//     errors.push(
//       "First name is required and must be a string with a maximum length of 50 characters."
//     );
//   }

//   if (!lastName || typeof lastName !== "string" || lastName.length < 1) {
//     errors.push(
//       "Last name is required and must be a string with a maximum length of 2 characters."
//     );
//   }

//   if (!gender || typeof gender !== "string") {
//     errors.push("Gender is required and must be a string ");
//   }

//   if (!email || !isValidEmail(email)) {
//     errors.push("Email is required and must be a valid email address ");
//   }

//   if (!mobileNo || !isValidMobileNumber(mobileNo) || mobileNo.length < 9) {
//     errors.push("Mobile number is required and must be a valid mobile number");
//   }

//   if (!address || typeof address !== "string" || address.length < 10) {
//     errors.push(
//       "Address is required and must be a string with a maximum length of 10 characters."
//     );
//   }

//   if (!password || typeof password !== "string" || password.length < 8) {
//     errors.push(
//       "Password is required and must be a string with a minimum length of 8 characters and a maximum length of 255 characters."
//     );
//   }

//   // If there are validation errors, send a response with the errors
//   ////console.log(mobileNo.length < 9);
//   ////console.log((!mobileNo || isValidMobileNumber(mobileNo) || mobileNo.length < 9));
//   //console.log(errors);
//   if (errors.length > 0) {
//     // return res.status(400).json({ errors });
//     return next(new HttpError("Invalid Data Please Enter a valid Data"), 400);
//   }
//   const check = await User.find({ uid: userID });
//   if (check.length > 0) {
//     //console.log("User Already Created" + check);
//     return next(new HttpError("User Already Exist"), 404);
//   }

//   const newUser = new User({
//     uid: userID,
//     password: password,
//     name: firstName,
//     cardid: cardid,
//     ptofilePhoto: profilePhoto,
//     status: "Active",
//   });
//   const userDetailSchema = new userdetail({
//     userID: userID,
//     firstName: firstName,
//     lastName: lastName,
//     gender: gender,
//     dob: dob,
//     cardid: cardid,
//     ptofilePhoto: profilePhoto,
//     email: email,
//     mobileNo: mobileNo,
//     address: address,
//   });

//   const roleSchema = new accesscontrol({
//     rolename: role,
//   });
//   try {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await userDetailSchema.save({ session: session });
//     await roleSchema.save({ session: session });
//     newUser.role = roleSchema._id;
//     newUser.moreDetail = userDetailSchema._id;
//     await newUser.save({ session: session });
//     roleSchema.user = newUser._id;
//     await roleSchema.save({ session: session });
//     await newUser.save({ session: session });
//     await session.commitTransaction();
//     return res.status(200).send(newUser);
//   } catch (err) {
//     return next(
//       new HttpError("Something Went wrong please contact admin"),
//       404
//     );
//   }
// };
// const hasLogged = (req, res, next) => {
//   const cookies = req.cookies;
//   if (!cookies) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   } else {
//     const refreshToken = cookies.jwt;
//     jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
//       {
//         if (err) {
//           return res.status(403).json({ message: "Forbidden" });
//         }
//         const foundUser = await User.findById(decoded.id);
//         if (!foundUser) {
//           return res.status(401).json({ message: "Unauthorized" });
//         }
//         const accessToken = jwt.sign(
//           {
//             id: foundUser._id,
//             name: foundUser.name,
//           },
//           process.env.ACCESSTOKEN,
//           { expiresIn: "15m" }
//         );
//         return res.status(200).json({ token: accessToken });
//       }
//     });
//   }
// };

// const getUserRole = (req, res, next) => {
//   const cookies = req.cookies;
//   if (!cookies) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   } else {
//     const refreshToken = cookies.jwt;
//     jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
//       {
//         if (err) {
//           return res.status(403).json({ message: "Forbidden" });
//         }
//         await User.findById(decoded.id)
//           .then(async (foundUser) => {
//             await accesscontrol
//               .findById(foundUser.role)
//               .then((userRole) => {
//                 return res.status(200).json({ userRole: userRole.rolename });
//               })
//               .catch(async (err) => {
//                 return res.status(404).json({ message: "Role not found" });
//               });
//           })
//           .catch(async (err) => {
//             return res.status(404).json({ message: "User not found" });
//           });
//       }
//     });
//   }
// };

// const refresh = (req, res, next) => {
//   const cookies = req.cookies;
//   if (!cookies) {
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   } else {
//     const refreshToken = cookies.jwt;
//     jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
//       {
//         if (err) {
//           return res.status(403).json({ message: "Forbidden" });
//         }
//         const foundUser = await User.findById(decoded.id);
//         if (!foundUser) {
//           return res.status(401).json({ message: "Unauthorized" });
//         }
//         const accessToken = jwt.sign(
//           {
//             id: foundUser._id,
//             name: foundUser.name,
//           },
//           process.env.ACCESSTOKEN,
//           { expiresIn: "15m" }
//         );
//         return res.status(200).json({ token: accessToken });
//       }
//     });
//   }
// };
// const getUserName = async (req, res) => {
//   let fname = await User.findById(req.user.id);
//   if (fname) {
//     return res.status(200).send({
//       name: fname.name,
//     });
//   }
//   return res.status(300).send({
//     name: "Unkown",
//   });
// };

// const logOut = (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies) {
//     return res.status(204).send();
//   }
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.json({ message: "cookie cleared" });
// };
// const getUserProfileData = async (req, res) => {
//   let user = await User.findById(req.user.id);
//   let userDetailSchema = await userdetail.findById(user.moreDetail);
//   let academicschema;
//   let coursesSchema;
//   console.log(user);
//   console.log(userDetailSchema);
//   console.log(req.user);
//   if (req.user.role === "faculty") {
//     academicschema = await Academic.find({ faculty: user._id });
//   } else if (req.user.role === "student") {
//     academicschema = await StudentAcademic.find({ student: user._id });
//   } else if (req.user.role === "admin" || req.user.role == "librarian") {
//     return res.status(200).send({
//       name: user.name,
//       uniqueId: user.cardid,
//       regId: user.uid,
//       // class:,
//       email: userDetailSchema.email,
//       photo: userDetailSchema.ptofilePhoto,
//       dob: userDetailSchema.dob,
//       phoneNo: userDetailSchema.mobileNo,
//       gender: userDetailSchema.gender,
//       communicationAddress: userDetailSchema.address,
//       permanentAddress: userDetailSchema.address,
//     });
//   }
//   if (academicschema.length > 0) {
//     academicschema = academicschema[0];
//     coursesSchema = await Courses.findById(academicschema.course);
//   }
//   console.log(academicschema);
//   console.log(coursesSchema);
//   if (user) {
//     return res.status(200).send({
//       name: user.name,
//       uniqueId: user.cardid,
//       regId: user.uid,
//       admissionYear: academicschema.year,
//       academicYear: +academicschema.year + +coursesSchema.duration,
//       course: coursesSchema.coursename,
//       degree: coursesSchema.degree,
//       // class:,
//       email: userDetailSchema.email,
//       photo: userDetailSchema.ptofilePhoto,
//       dob: userDetailSchema.dob,
//       phoneNo: userDetailSchema.mobileNo,
//       gender: userDetailSchema.gender,
//       communicationAddress: userDetailSchema.address,
//       permanentAddress: userDetailSchema.address,
//     });
//   }
//   return res.status(300).send({
//     name: "Unkown",
//   });
// };

// exports.doLogin = doLogin;
// exports.createUser = createUser;
// exports.getAllUser = getAllUser;
// exports.deletUser = deletUser;
// exports.updateUserStatus = updateUserStatus;
// exports.getRole = getRole;
// exports.getAcademicWithRole = getAcademicWithRole;
// exports.addAcademic = addAcademic;
// exports.refresh = refresh;
// exports.logOut = logOut;
// exports.getUserName = getUserName;
// exports.getUserProfileData = getUserProfileData;
// exports.hasLogged = hasLogged;
// exports.getUserRole = getUserRole;

const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const User = require("../models/user-schema");
const jwt = require("jsonwebtoken");
const accesscontrol = require("../models/accessControl-schema");
const userdetail = require("../models/userDetail-schema");
const { default: mongoose } = require("mongoose");
const cryptography = require("../models/Cryptography");
const StudentAcademic = require("../models/Academics/student-academics-schema");
const Academic = require("../models/Academics/academics-schema");
const Semester = require("../models/Course/semester-schema");
const Courses = require("../models/Course/courses-schema");

// Helper function to verify admin privileges
const verifyAdmin = (user) => {
  return user.role === "admin";
};

/**
 * Get users by role
 */
const getRole = async (req, res, next) => {
  try {
    const rolereq = req.query.role;
    if (!rolereq) {
      return res.status(400).send({ message: "Role parameter is required" });
    }

    const roles = await accesscontrol.find({ role: rolereq });
    if (!roles.length) {
      return res.status(404).send({ message: "No users found with this role" });
    }

    const data = await Promise.all(
      roles.map(async (val) => {
        const username = await User.findById(val.user);
        return {
          id: val._id,
          role: val.rolename,
          user: val.user,
          name: username?.name || "Unknown",
        };
      })
    );

    return res.status(200).send(data);
  } catch (err) {
    console.error("Error in getRole:", err);
    return res.status(500).send({ message: "Error while processing the data" });
  }
};

/**
 * Get academic details based on user type
 */
const getAcademicDetails = async (userType) => {
  try {
    if (userType === "student") {
      return await StudentAcademic.find({});
    } else if (userType === "faculty") {
      return await Academic.find({});
    }
    return [];
  } catch (err) {
    console.error("Error in getAcademicDetails:", err);
    throw err;
  }
};

/**
 * Get academic details with role information
 */
const getAcademicWithRole = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    const rolereq = req.query.rolename;
    if (!rolereq) {
      return res.status(400).send({ message: "Role name is required" });
    }

    const [roles, users] = await Promise.all([
      accesscontrol.find({ rolename: rolereq }),
      User.find({}),
    ]);

    if (!roles.length || !users.length) {
      return res.status(404).send({ message: "No Data Found" });
    }

    const academics = await getAcademicDetails(rolereq);

    const data = await Promise.all(
      roles.map(async (val) => {
        const username = users.find((userval) => userval._id.equals(val.user));

        let checkAcademic = [];
        if (academics.length && val.academic) {
          checkAcademic = academics.filter((acaval) =>
            val.academic.equals(acaval._id)
          );
        }

        if (username) {
          return {
            id: val._id,
            role: val.rolename,
            academic: checkAcademic[0]?.course || "",
            year: checkAcademic[0]?.year || "",
            name: username.name,
            regno: username.uid,
            userid: username._id,
          };
        }
        return null;
      })
    );

    const filteredData = data.filter(Boolean);
    if (filteredData.length) {
      return res.status(200).send(filteredData);
    }
    return res.status(404).send({ message: "No Data Found" });
  } catch (err) {
    console.error("Error in getAcademicWithRole:", err);
    return res.status(500).send({ message: "Error while processing the data" });
  }
};

/**
 * Add academic information to user
 */
const addAcademic = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    const data = req.body;
    if (!data || !data.id) {
      return res.status(400).send({ message: "Invalid request data" });
    }

    const role = await accesscontrol.findById(data.id);
    if (!role) {
      return res.status(404).send({ message: "Role not found" });
    }

    if (role.academic) {
      return res.status(200).send({
        message: "User Already Assigned to Course Successfully",
      });
    }

    let academic;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (data.role === "student") {
        academic = new StudentAcademic({
          year: data.year,
          student: data.userid,
          course: data.academic,
        });
      } else if (data.role === "faculty") {
        academic = new Academic({
          year: data.year,
          faculty: data.userid,
          course: data.academic,
        });
      } else {
        await session.abortTransaction();
        return res.status(400).send({ message: "Invalid role specified" });
      }

      await academic.save({ session });
      role.academic = academic._id;
      await role.save({ session });
      await session.commitTransaction();

      return res.status(200).send({
        message: "User Assigned to Course Successfully",
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Error in addAcademic:", err);
    return res.status(500).send({ message: "Error processing the request" });
  }
};

/**
 * Delete user and associated data
 */
const deletUser = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    const reqId = req.body.id;
    if (!reqId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findById(reqId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await userdetail.findByIdAndDelete(user.moreDetail).session(session);
      await accesscontrol.findByIdAndDelete(user.role).session(session);
      await User.findByIdAndDelete(reqId).session(session);
      await session.commitTransaction();

      return res.status(200).send({ message: "User Deleted Successfully" });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Error in deletUser:", err);
    return res.status(500).send({ message: "Unable to Delete the user" });
  }
};

/**
 * Update user status
 */
const updateUserStatus = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    const { id, status } = req.body.data || {};
    if (!id || !status) {
      return res.status(400).send({ message: "Invalid request data" });
    }

    const user = await User.findByIdAndUpdate(id, { status }, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ message: "UserStatus Updated successfully" });
  } catch (err) {
    console.error("Error in updateUserStatus:", err);
    return res
      .status(500)
      .send({ message: "Error while updating user status" });
  }
};

/**
 * Get all users (admin only)
 */
const getAllUser = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    const users = await User.find({});
    const respData = users.map((val) => ({
      uid: val.uid,
      id: val._id,
      name: val.name,
      status: val.status,
    }));

    return res.status(200).send(respData);
  } catch (err) {
    console.error("Error in getAllUser:", err);
    return res.status(500).send({ message: "Error fetching users" });
  }
};

/**
 * User login with JWT token generation
 */
const doLogin = async (req, res, next) => {
  try {
    const { uid, password } = req.query;
    if (!uid || !password) {
      return next(new HttpError("UID and password are required", 400));
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return next(new HttpError("User Cannot Be found", 404));
    }

    // Password verification (currently bypassed)
    // In production, you should implement proper password verification
    const passwordValid = true; // Replace with actual password verification

    if (!passwordValid) {
      return next(new HttpError("Incorrect Password", 401));
    }

    const roles = await accesscontrol.find({ user: user._id });
    if (!roles.length) {
      return next(new HttpError("Error in finding the user role", 404));
    }

    const response = {
      id: user._id,
      name: user.name,
      role: roles[0].rolename,
    };

    const accessToken = jwt.sign(response, process.env.ACCESSTOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(response, process.env.REFRESHTOKEN, {
      expiresIn: "5h",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "signed successfully",
      ...response,
      token: accessToken,
    });
  } catch (err) {
    console.error("Error in doLogin:", err);
    return next(new HttpError("Login failed", 500));
  }
};

/**
 * Create new user with validation
 */
const createUser = async (req, res, next) => {
  try {
    if (!verifyAdmin(req.user)) {
      return res.status(403).send("Not Authorized to perform the action");
    }

    // Validation functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidMobileNumber = (mobileNumber) => /^\d{10}$/.test(mobileNumber);

    const {
      cardid,
      profilePhoto,
      role,
      uid: userID,
      firstName,
      lastName,
      gender,
      dob,
      email,
      mobileNo,
      address,
      password,
    } = req.body;

    // Validation checks
    const errors = [];
    if (!cardid || typeof cardid !== "string" || cardid.length < 4) {
      errors.push("Invalid Card ID");
    }
    if (!profilePhoto || typeof profilePhoto !== "string") {
      errors.push("Invalid Profile Photo");
    }
    if (!role || typeof role !== "string") {
      errors.push("Invalid Role");
    }
    if (!userID || typeof userID !== "string" || userID.length < 9) {
      errors.push("Invalid User ID");
    }
    if (!firstName || typeof firstName !== "string" || firstName.length < 2) {
      errors.push("Invalid First Name");
    }
    if (!lastName || typeof lastName !== "string" || lastName.length < 1) {
      errors.push("Invalid Last Name");
    }
    if (!gender || typeof gender !== "string") {
      errors.push("Invalid Gender");
    }
    if (!email || !isValidEmail(email)) {
      errors.push("Invalid Email");
    }
    if (!mobileNo || !isValidMobileNumber(mobileNo)) {
      errors.push("Invalid Mobile Number");
    }
    if (!address || typeof address !== "string" || address.length < 10) {
      errors.push("Invalid Address");
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      errors.push("Invalid Password");
    }

    if (errors.length) {
      return next(new HttpError(errors.join(", "), 400));
    }

    const existingUser = await User.findOne({ uid: userID });
    if (existingUser) {
      return next(new HttpError("User Already Exist", 409));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userDetailSchema = new userdetail({
        userID,
        firstName,
        lastName,
        gender,
        dob,
        cardid,
        ptofilePhoto: profilePhoto,
        email,
        mobileNo,
        address,
      });

      const roleSchema = new accesscontrol({
        rolename: role,
      });

      const newUser = new User({
        uid: userID,
        password,
        name: firstName,
        cardid,
        ptofilePhoto: profilePhoto,
        status: "Active",
      });

      await userDetailSchema.save({ session });
      await roleSchema.save({ session });

      newUser.role = roleSchema._id;
      newUser.moreDetail = userDetailSchema._id;
      await newUser.save({ session });

      roleSchema.user = newUser._id;
      await roleSchema.save({ session });

      await session.commitTransaction();
      return res.status(201).send(newUser);
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Error in createUser:", err);
    return next(
      new HttpError("Something went wrong, please contact admin", 500)
    );
  }
};

/**
 * Check if user is logged in
 */
const hasLogged = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findById(decoded.id);
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.ACCESSTOKEN,
        { expiresIn: "15m" }
      );

      return res.status(200).json({ token: accessToken });
    });
  } catch (err) {
    console.error("Error in hasLogged:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get user role
 */
const getUserRole = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findById(decoded.id);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const userRole = await accesscontrol.findOne({ user: foundUser._id });
      if (!userRole) {
        return res.status(404).json({ message: "Role not found" });
      }

      return res.status(200).json({ userRole: userRole.rolename });
    });
  } catch (err) {
    console.error("Error in getUserRole:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Refresh access token
 */
const refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESHTOKEN, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findById(decoded.id);
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.ACCESSTOKEN,
        { expiresIn: "15m" }
      );

      return res.status(200).json({ token: accessToken });
    });
  } catch (err) {
    console.error("Error in refresh:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get user name
 */
const getUserName = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ name: "Unknown" });
    }
    return res.status(200).send({ name: user.name });
  } catch (err) {
    console.error("Error in getUserName:", err);
    return res.status(500).send({ name: "Unknown" });
  }
};

/**
 * User logout
 */
const logOut = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).send();
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

/**
 * Get user profile data
 */
const getUserProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ name: "Unknown" });
    }

    const userDetailSchema = await userdetail.findOne({ userID: user.uid });
    if (!userDetailSchema) {
      return res.status(404).send({ message: "User details not found" });
    }

    let academicschema, coursesSchema;
    const baseProfile = {
      name: user.name,
      uniqueId: user.cardid,
      regId: user.uid,
      email: userDetailSchema.email,
      photo: userDetailSchema.ptofilePhoto,
      dob: userDetailSchema.dob,
      phoneNo: userDetailSchema.mobileNo,
      gender: userDetailSchema.gender,
      communicationAddress: userDetailSchema.address,
      permanentAddress: userDetailSchema.address,
    };

    if (req.user.role === "admin" || req.user.role === "librarian") {
      return res.status(200).send(baseProfile);
    }

    if (req.user.role === "faculty") {
      academicschema = await Academic.findOne({ faculty: user._id });
    } else if (req.user.role === "student") {
      academicschema = await StudentAcademic.findOne({ student: user._id });
    }

    if (academicschema) {
      coursesSchema = await Courses.findById(academicschema.course);
      return res.status(200).send({
        ...baseProfile,
        admissionYear: academicschema.year,
        academicYear: +academicschema.year + +(coursesSchema?.duration || 0),
        course: coursesSchema?.coursename || "",
        degree: coursesSchema?.degree || "",
      });
    }

    return res.status(200).send(baseProfile);
  } catch (err) {
    console.error("Error in getUserProfileData:", err);
    return res.status(500).send({ message: "Error fetching profile data" });
  }
};

// Export all controller functions
module.exports = {
  doLogin,
  createUser,
  getAllUser,
  deletUser,
  updateUserStatus,
  getRole,
  getAcademicWithRole,
  addAcademic,
  refresh,
  logOut,
  getUserName,
  getUserProfileData,
  hasLogged,
  getUserRole,
};
