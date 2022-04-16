import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello world ");
  });
  //rest api demo
  router.get("/homepage", homeController.getHomePage);
  router.get("/aboutpage", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //create api for app
  router.post("/api/login", userController.handleLogin);
  return app.use("/", router);
};
module.exports = initWebRoutes;
