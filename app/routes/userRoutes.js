

/*Authorization:

GET /api/test/all
GET /api/test/user for loggedin users (user/moderator/admin)
GET /api/test/mod for moderator
GET /api/test/admin for admin*/ 

const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};