module.exports = (express, app) => {
    const controller = require("../controller/userController.js");
    const router = express.Router();
  
    router.get("/login", controller.findUser);
    
    router.get("/", controller.findAllUser);
    
    router.post("/", controller.createUser);
  
    app.use("/api/users", router);
  };