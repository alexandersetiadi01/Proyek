module.exports = (express, app) => {
    const controller = require("../controller/proyekController.js");
    const router = express.Router();
  
    router.get("/selectProyek", controller.findProyek);

    router.get("/", controller.seeAllProyek);
  
    router.post("/", controller.createProyek);
  
    app.use("/api/proyek", router);
  };