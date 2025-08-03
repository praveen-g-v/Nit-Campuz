const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");
const Access = require("../models/accessControl-schema");
const getRole = async (req) => {
  const user = await User.findById(req.user.id);
  if (user) {
    // console.log(user);
    const role = await Access.findById(user.role);
    if (role) {
      // console.log(role);
      req.user.role = role.rolename;
      req.user.roleId = role._id;
      req.user.status = user.status;
    }
    return req;
  }
};

function authenticateToken(req, res, next) {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  // console.log(req.headers);
  if (!token || !token.startsWith("Bearer")) {
    return res.sendStatus(401);
  }

  const acessToken = token.split(" ")[1];
  try {
    jwt.verify(acessToken, process.env.ACCESSTOKEN, async (err, user) => {
      if (err) {
        // console.log(err);
        return res.status(403).send({ message: "Forbidden" });
      }
      req.user = user;
      const checkuser = await getRole(req);
      if (!checkuser) {
        return res.status(403).send({ message: "Forbidden" });
      }
      // console.log(checkuser.user);
      if (
        checkuser.user.status === "Active" ||
        checkuser.user.status === "active"
      ) {
        // req.user = checkuser.user;
        console.log("sending to other parts");
        next();
      } else {
        res.status(403).send({ message: "Your account is inactive" });
      }
    });
  } catch (err) {
    res.status(403).send({ message: "Forbidden" });
  }
}

module.exports = authenticateToken;
