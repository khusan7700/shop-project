import ProductModel from "../schema/Product.model";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { Request, Response } from "express";
import { Member, MemberInput, LoginInput } from "../libs/types/member";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;

    const productService = new ProductService();
    const productController: T = {};

    productController.getAllProducts = async (req: Request, res: Response) => {
      try {
        console.log("getAllProducts");
        res.render("products");
      } catch (err) {
        console.log("Error, getAllProducts:", err);
        const message =
          err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
          `<script> alert("${message}"); window.location.replace("admin/signup")</script>`
        );
      }
    };

    productController.createNewProduct = async (
      req: Request,
      res: Response
    ) => {
      try {
        console.log("createNewProduct");
      } catch (err) {
        console.log("Error, createNewProduct:", err);
        const message =
          err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
          `<script> alert("${message}"); window.location.replace("admin/signup")</script>`
        );
      }
    };
  }
}
export default ProductService;
