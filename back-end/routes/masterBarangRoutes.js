module.exports = (express, app) => {
    const controller = require("../controller/masterBarangController.js");
    const router = express.Router();
  
    router.get("/", controller.seeAll);
  
    router.post("/", controller.create);

    router.get("/search", controller.searchByName);
  
    app.use("/api/masterBarang", router);
  };