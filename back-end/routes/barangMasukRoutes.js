module.exports = (express, app) => {
    const controller = require("../controller/barangMasukController.js");
    const router = express.Router();
  
    router.get("/", controller.seeAll);
  
    router.post("/", controller.create);

  //  router.get("/Search", controller.searchByName);
  
    app.use("/api/barangMasuk", router);
};