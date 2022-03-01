module.exports = (express, app) => {
    const controller = require("../controller/inventoryController.js");
    const router = express.Router();
  
    router.post("/", controller.create);

    router.put("/inventoryMasuk", controller.inventoryBarangMasuk);
    router.put("/inventoryKeluar", controller.inventoryBarangKeluar);

    router.get("/", controller.seeAll);
    router.get("/find", controller.findItem);
  
    app.use("/api/inventory", router);
  };