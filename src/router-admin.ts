import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

const routerAdmin = express.Router();

// RESTAURANT
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

// PRODUCTIONS
routerAdmin.get(
  "/product/all",
  restaurantController.verifyRestaurant,
  productController.getAllProducts
);

routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);

routerAdmin.post(
  "/product/:id",
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct
);

// USERS

routerAdmin.get(
  "/user",
  restaurantController.verifyRestaurant,
  restaurantController.getUsers
);

routerAdmin.get(
  "/user/edit",
  restaurantController.verifyRestaurant,
  restaurantController.updateChosenUser
);
export default routerAdmin;
