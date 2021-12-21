/** 
 * How the server will respond 
*/

/*
Authentication routes:

POST /api/auth/signup
POST /api/auth/signin*/


const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/auth/signup",[ verifySignUp.checkDuplicateUsers, verifySignUp.checkRoles], controller.signup
    );
    
  app.post("/api/auth/signin", controller.signin);
};