module.exports = (express, app) => {
    const controller = require("../controller/barangKeluarController.js");
    const router = express.Router();
  
    router.get("/", controller.seeAll);
  
    router.post("/", controller.create);

    //router.get("/search", controller.searchByName);
  
    app.use("/api/barangKeluar", router);
};