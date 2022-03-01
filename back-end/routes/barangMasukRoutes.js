module.exports = (express, app) => {
    const controller = require("../controller/barangMasukController.js");
    const router = express.Router();
  
    router.get("/listBarangMasuk", controller.seeAllBarangMasuk);

    router.get("/listBarangSisa", controller.seeAllBarangSisa);

    router.get("/", controller.seeAllBarang);
  
    router.post("/addBarangMasuk", controller.createBarangMasuk);

    router.post("/addBarangSisa", controller.createBarangSisa);


  //  router.get("/Search", controller.searchByName);
  
    app.use("/api/barangMasuk", router);
};