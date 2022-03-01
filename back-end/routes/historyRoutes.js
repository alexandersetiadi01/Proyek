module.exports = (express, app) => {
    const controller = require("../controller/historyController.js");
    const router = express.Router();
  
    //router.post("/", controller.create);

    router.get("/list", controller.seeHistory);
    router.post("/addHistory", controller.addHistory);
  
    app.use("/api/history", router);
  };